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

const courseAlertSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(254, "Email must be 254 characters or fewer"),
  courseName: z
    .string()
    .trim()
    .min(1, "Course name is required")
    .max(100, "Course name is too long"),
});

const COURSE_ALERT_RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
};

export async function POST(req: NextRequest) {
  const rateLimitResult = applyRateLimit({
    key: buildRateLimitKey("coursealert", req),
    maxRequests: COURSE_ALERT_RATE_LIMIT.maxRequests,
    windowMs: COURSE_ALERT_RATE_LIMIT.windowMs,
  });

  const rateLimitHeaders = getRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.allowed) {
    return apiError("Too many alert requests. Please try again later.", 429);
  }

  try {
    const body = await req.json();
    const result = courseAlertSchema.safeParse(body);

    if (!result.success) {
      return apiError("Invalid alert payload", 400, result.error.flatten().fieldErrors);
    }

    const { email, courseName } = result.data;

    const submission = await prisma.contactSubmission.create({
      data: {
        name: "Course Alert Subscriber",
        email,
        message: `Subscribed for course alert: ${courseName}`,
      },
    });

    if (env.smtp.user) {
      try {
        await sendEmail({
          to: env.smtp.user,
          subject: `New Course Alert Subscription: ${courseName}`,
          text: `User email: ${email}\nCourse: ${courseName}\nSubscribed at: ${new Date().toISOString()}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>New Course Alert Subscription</h2>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Course:</strong> ${courseName}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send course alert notification email:", emailError);
      }
    }

    const response = apiSuccess(
      { message: "Alert registered successfully", data: submission },
      201
    );
    for (const [key, value] of Object.entries(rateLimitHeaders)) {
      response.headers.set(key, value);
    }
    return response;
  } catch (error) {
    console.error("Error creating course alert:", error);
    return apiError("Internal server error", 500);
  }
}
