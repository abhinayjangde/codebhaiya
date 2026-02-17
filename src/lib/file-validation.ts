const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const MAX_IMAGE_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;

interface ValidImageFile {
  buffer: Buffer;
  mimeType: string;
  size: number;
}

type ValidateImageResult =
  | { ok: true; file: ValidImageFile }
  | { ok: false; error: string };

function hasPngSignature(buffer: Buffer) {
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  return (
    buffer.length >= signature.length &&
    signature.every((byte, index) => buffer[index] === byte)
  );
}

function hasJpegSignature(buffer: Buffer) {
  return (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  );
}

function hasGifSignature(buffer: Buffer) {
  if (buffer.length < 6) {
    return false;
  }

  const header = buffer.subarray(0, 6).toString("ascii");
  return header === "GIF87a" || header === "GIF89a";
}

function hasWebpSignature(buffer: Buffer) {
  if (buffer.length < 12) {
    return false;
  }

  const riff = buffer.subarray(0, 4).toString("ascii");
  const webp = buffer.subarray(8, 12).toString("ascii");

  return riff === "RIFF" && webp === "WEBP";
}

function matchesMimeSignature(mimeType: string, buffer: Buffer) {
  switch (mimeType) {
    case "image/png":
      return hasPngSignature(buffer);
    case "image/jpeg":
    case "image/jpg":
      return hasJpegSignature(buffer);
    case "image/gif":
      return hasGifSignature(buffer);
    case "image/webp":
      return hasWebpSignature(buffer);
    default:
      return false;
  }
}

export async function validateAndReadImageFile(
  file: File
): Promise<ValidateImageResult> {
  if (!file) {
    return { ok: false, error: "No file provided" };
  }

  if (!ALLOWED_IMAGE_MIME_TYPES.has(file.type)) {
    return {
      ok: false,
      error: "Only JPG, PNG, GIF, and WEBP images are allowed",
    };
  }

  if (file.size <= 0) {
    return { ok: false, error: "Uploaded file is empty" };
  }

  if (file.size > MAX_IMAGE_UPLOAD_SIZE_BYTES) {
    return { ok: false, error: "File size must be less than 5MB" };
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (!matchesMimeSignature(file.type, buffer)) {
    return { ok: false, error: "File content does not match image type" };
  }

  return {
    ok: true,
    file: {
      buffer,
      mimeType: file.type,
      size: file.size,
    },
  };
}
