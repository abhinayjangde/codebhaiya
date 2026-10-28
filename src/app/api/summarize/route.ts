import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { prisma } from "@/lib/prisma";
import {
  apiError,
  apiSuccess,
  notFound,
  serverError,
  validationError,
} from "@/lib/api-response";
import { csrfErrorResponse, isValidCsrfRequest } from "@/lib/api-security";
import { applySharedRateLimit, buildRateLimitKey, getRateLimitHeaders } from "@/lib/rate-limiter";
import { requireAuth } from "@/lib/session";
import { readRequestBody } from "@/lib/request-body";
import { z } from "zod";

export const maxDuration = 30;

const SUMMARIZE_RATE_LIMIT = {
  maxRequests: 10,
  windowMs: 10 * 60 * 1000,
};
const SUMMARIZE_IP_RATE_LIMIT = {
  maxRequests: 30,
  windowMs: 10 * 60 * 1000,
};
const MAX_SUMMARIZE_BODY_BYTES = 1 * 1024;

const summarizeSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
});

export async function POST(req: Request) {
  if (!isValidCsrfRequest(req)) {
    return csrfErrorResponse();
  }

  const { user, error: authError } = await requireAuth();
  if (authError) return authError;

  const userRateLimitResult = await applySharedRateLimit({
    key: buildRateLimitKey("summarize", req, user!.id),
    maxRequests: SUMMARIZE_RATE_LIMIT.maxRequests,
    windowMs: SUMMARIZE_RATE_LIMIT.windowMs,
  });
  const ipRateLimitResult = await applySharedRateLimit({
    key: buildRateLimitKey("summarize-ip", req),
    maxRequests: SUMMARIZE_IP_RATE_LIMIT.maxRequests,
    windowMs: SUMMARIZE_IP_RATE_LIMIT.windowMs,
  });

  if (!userRateLimitResult.allowed || !ipRateLimitResult.allowed) {
    return new Response(
      JSON.stringify({ error: "Too many summarize requests. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json", ...getRateLimitHeaders(userRateLimitResult) } }
    );
  }

  try {
    const body = JSON.parse(await readRequestBody(req, MAX_SUMMARIZE_BODY_BYTES));
    const { postId } = summarizeSchema.parse(body);

    const post = await prisma.post.findUnique({
      where: { id: postId, published: true },
      select: { id: true, title: true, content: true, summary: true },
    });

    if (!post) {
      return notFound("Post not found");
    }

    if (post.summary) {
      return apiSuccess(
        {
          summary: post.summary,
          cached: true,
        },
        200
      );
    }

    const truncatedContent =
      post.content.length > 15000
        ? post.content.slice(0, 15000) + "...[content truncated]"
        : post.content;

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      system: `You are a helpful assistant that creates concise, engaging TL;DR summaries for blog posts. 
Your summaries should:
- Be 2-3 sentences maximum
- Capture the key points and main takeaways
- Be written in a friendly, accessible tone
- Focus on what the reader will learn or gain`,
      prompt: `Create a TL;DR summary for this blog post:

Title: ${post.title}

Content:
${truncatedContent}

Provide ONLY the summary, no prefixes like "TL;DR:" or "Summary:".`,
    });

    const summary = result.text.trim();

    await prisma.post.update({
      where: { id: postId },
      data: { summary },
    });

    return apiSuccess(
      {
        summary,
        cached: false,
      },
      200
    );
  } catch (error) {
    if (error instanceof Error && error.message === "REQUEST_BODY_TOO_LARGE") {
      return apiError("Request body is too large", 413);
    }
    if (error instanceof z.ZodError) {
      return validationError(error.issues);
    }
    console.error("Error generating summary:", error);
    return serverError("Failed to generate summary");
  }
}
