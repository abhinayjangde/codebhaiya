import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
import env from "@/config/env";
import {
  applyRateLimit,
  buildRateLimitKey,
  getRateLimitHeaders,
} from "@/lib/rate-limiter";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or fewer")
    .refine((value) => !/[\r\n]/.test(value), "Name contains invalid characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(254, "Email must be 254 characters or fewer"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be 5000 characters or fewer"),
  website: z.string().max(200).optional(),
});

const CONTACT_RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  const rateLimitResult = applyRateLimit({
    key: buildRateLimitKey("contact", req),
    maxRequests: CONTACT_RATE_LIMIT.maxRequests,
    windowMs: CONTACT_RATE_LIMIT.windowMs,
  });

  const rateLimitHeaders = getRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "Too many contact submissions. Please try again later." },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const { name, email, message, website } = result.data;

    if (website) {
      return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 201, headers: rateLimitHeaders }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        message,
      },
    });

    // Send email notification to Admin
    if (env.smtp.user) {
      try {
        const escapedName = escapeHtml(name);
        const escapedEmail = escapeHtml(email);
        const escapedMessage = escapeHtml(message);

        await sendEmail({
          to: env.smtp.user,
          subject: `New Contact Form Submission from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${escapedName}</p>
              <p><strong>Email:</strong> ${escapedEmail}</p>
              <hr />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${escapedMessage}</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send contact notification email:", emailError);
        // We don't fail the request if the email fails, we still saved it to the DB
      }
    }

    return NextResponse.json(
      { message: "Message sent successfully", data: submission },
      { status: 201, headers: rateLimitHeaders }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: rateLimitHeaders }
    );
  }
}
