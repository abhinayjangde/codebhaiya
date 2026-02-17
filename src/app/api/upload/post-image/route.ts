import cloudinary from "@/lib/cloudinary";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { csrfErrorResponse, isValidCsrfRequest } from "@/lib/api-security";
import { validateAndReadImageFile } from "@/lib/file-validation";
import {
  applyRateLimit,
  buildRateLimitKey,
  getRateLimitHeaders,
} from "@/lib/rate-limiter";

const POST_IMAGE_UPLOAD_RATE_LIMIT = {
  maxRequests: 20,
  windowMs: 10 * 60 * 1000,
};

export async function POST(req: NextRequest) {
  if (!isValidCsrfRequest(req)) {
    return csrfErrorResponse();
  }

  try {
    // Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitResult = applyRateLimit({
      key: buildRateLimitKey("upload-post-image", req, session.user.id),
      maxRequests: POST_IMAGE_UPLOAD_RATE_LIMIT.maxRequests,
      windowMs: POST_IMAGE_UPLOAD_RATE_LIMIT.windowMs,
    });

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Too many upload requests. Please try again later." },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    const userId = session.user.id;

    // Get postId from query params (optional - will use "drafts" folder if not provided)
    const searchParams = req.nextUrl.searchParams;
    const postId = searchParams.get("postId");

    // Determine folder path
    const folder = postId
      ? `codebhaiya/users/${userId}/posts/${postId}`
      : `codebhaiya/users/${userId}/drafts`;

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

    // Upload to Cloudinary using a stream with organized folder structure
    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder,
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
      {
        url: result.secure_url,
        publicId: result.public_id,
      },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
