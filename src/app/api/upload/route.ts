import cloudinary from "@/lib/cloudinary";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { csrfErrorResponse, isValidCsrfRequest } from "@/lib/api-security";
import { validateAndReadImageFile } from "@/lib/file-validation";
import {
  applyRateLimit,
  buildRateLimitKey,
  getRateLimitHeaders,
} from "@/lib/rate-limiter";

// Cloudinary connection is now handled in lib/cloudinary.ts

const UPLOAD_RATE_LIMIT = {
  maxRequests: 15,
  windowMs: 10 * 60 * 1000,
};

export async function POST(req: Request) {
  if (!isValidCsrfRequest(req)) {
    return csrfErrorResponse();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rateLimitResult = applyRateLimit({
    key: buildRateLimitKey("upload", req, session.user.id),
    maxRequests: UPLOAD_RATE_LIMIT.maxRequests,
    windowMs: UPLOAD_RATE_LIMIT.windowMs,
  });

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "Too many upload requests. Please try again later." },
      { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    const validationResult = await validateAndReadImageFile(file);
    if (!validationResult.ok) {
      return NextResponse.json(
        { error: validationResult.error },
        { status: 400, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    // Upload to Cloudinary using a stream
    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: `codebhaiya/users/${session.user.id}/uploads`,
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else if (result) {
                resolve(result);
              } else {
                reject(new Error("Upload failed with no result"));
              }
            }
          )
          .end(validationResult.file.buffer);
      }
    );

    return NextResponse.json(
      { url: result.secure_url, publicId: result.public_id },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }
}
