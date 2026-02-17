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
import { applyRateLimit, buildRateLimitKey } from "@/lib/rate-limiter";
import { z } from "zod";

export const maxDuration = 30;

const SUMMARIZE_RATE_LIMIT = {
  maxRequests: 20,
  windowMs: 10 * 60 * 1000,
};

const summarizeSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
});

export async function POST(req: Request) {
  if (!isValidCsrfRequest(req)) {
    return csrfErrorResponse();
  }

  const rateLimitResult = applyRateLimit({
    key: buildRateLimitKey("summarize", req),
    maxRequests: SUMMARIZE_RATE_LIMIT.maxRequests,
    windowMs: SUMMARIZE_RATE_LIMIT.windowMs,
  });

  if (!rateLimitResult.allowed) {
    return apiError(
      "Too many summarize requests. Please try again later.",
      429
    );
  }

  try {
    const body = await req.json();
    const { postId } = summarizeSchema.parse(body);

    const post = await prisma.post.findUnique({
      where: { id: postId },
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
    if (error instanceof z.ZodError) {
      return validationError(error.issues);
    }
    console.error("Error generating summary:", error);
    return serverError("Failed to generate summary");
  }
}
