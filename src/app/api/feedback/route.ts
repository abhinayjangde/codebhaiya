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

const feedbackSchema = z.object({
  feedback: z
    .string()
    .trim()
    .min(2, "Feedback must be at least 2 characters")
    .max(5000, "Feedback must be 5000 characters or fewer"),
});

const FEEDBACK_RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
};

export async function POST(req: NextRequest) {
  const rateLimitResult = applyRateLimit({
    key: buildRateLimitKey("feedback", req),
    maxRequests: FEEDBACK_RATE_LIMIT.maxRequests,
    windowMs: FEEDBACK_RATE_LIMIT.windowMs,
  });

  const rateLimitHeaders = getRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.allowed) {
    return apiError("Too many feedback submissions. Please try again later.", 429);
  }

  try {
    const body = await req.json();
    const result = feedbackSchema.safeParse(body);

    if (!result.success) {
      return apiError("Invalid feedback submission", 400, result.error.flatten().fieldErrors);
    }

    const { feedback } = result.data;

    const submission = await prisma.contactSubmission.create({
      data: {
        name: "Anonymous Feedback",
        email: "feedback@codebhaiya.com",
        message: `[Course Feedback]: ${feedback}`,
      },
    });

    if (env.smtp.user) {
      try {
        await sendEmail({
          to: env.smtp.user,
          subject: "New Anonymous Course Feedback",
          text: `Feedback:\n${feedback}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>New Anonymous Course Feedback</h2>
              <p style="white-space: pre-wrap;">${feedback}</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send feedback notification email:", emailError);
      }
    }

    const response = apiSuccess(
      { message: "Feedback submitted successfully", data: submission },
      201
    );
    for (const [key, value] of Object.entries(rateLimitHeaders)) {
      response.headers.set(key, value);
    }
    return response;
  } catch (error) {
    console.error("Error creating course feedback:", error);
    return apiError("Internal server error", 500);
  }
}
