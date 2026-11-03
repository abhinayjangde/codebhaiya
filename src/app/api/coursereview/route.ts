import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
import env from "@/config/env";
import {
  applyRateLimit,
  buildRateLimitKey,
  getRateLimitHeaders,
} from "@/lib/rate-limiter";
import { apiError, apiSuccess } from "@/lib/api-response";

const courseReviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(254, "Email must be 254 characters or fewer"),
  message: z
    .string()
    .trim()
    .min(5, "Review message must be at least 5 characters")
    .max(5000, "Review message must be 5000 characters or fewer"),
  courseName: z
    .string()
    .trim()
    .min(1, "Course name is required")
    .max(100, "Course name is too long"),
});

const REVIEW_RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
};

export async function POST(req: NextRequest) {
  const rateLimitResult = applyRateLimit({
    key: buildRateLimitKey("coursereview", req),
    maxRequests: REVIEW_RATE_LIMIT.maxRequests,
    windowMs: REVIEW_RATE_LIMIT.windowMs,
  });

  const rateLimitHeaders = getRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.allowed) {
    return apiError("Too many review submissions. Please try again later.", 429);
  }

  try {
    const body = await req.json();
    const result = courseReviewSchema.safeParse(body);

    if (!result.success) {
      return apiError("Invalid review submission", 400, result.error.flatten().fieldErrors);
    }

    const { name, email, message, courseName } = result.data;

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        message: `[Review for ${courseName}]: ${message}`,
      },
    });

    if (env.smtp.user) {
      try {
        await sendEmail({
          to: env.smtp.user,
          subject: `New Review for ${courseName} from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nCourse: ${courseName}\n\nReview:\n${message}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>New Review for ${courseName}</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Course:</strong> ${courseName}</p>
              <hr />
              <p><strong>Review:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send review notification email:", emailError);
      }
    }

    const response = apiSuccess(
      { message: "Review submitted successfully", data: submission },
      201
    );
    for (const [key, value] of Object.entries(rateLimitHeaders)) {
      response.headers.set(key, value);
    }
    return response;
  } catch (error) {
    console.error("Error creating course review:", error);
    return apiError("Internal server error", 500);
  }
}
