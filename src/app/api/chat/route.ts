import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  apiError,
  unauthorized,
  serverError,
  validationError,
} from "@/lib/api-response";
import { csrfErrorResponse, isValidCsrfRequest } from "@/lib/api-security";
import {
  applyRateLimit,
  buildRateLimitKey,
  getRateLimitHeaders,
} from "@/lib/rate-limiter";
import { z } from "zod";

export const maxDuration = 30;

const CHAT_RATE_LIMIT = {
  maxRequests: 40,
  windowMs: 5 * 60 * 1000,
};

const chatSchema = z.object({
  messages: z.array(
    z
      .object({
        // AI SDK v4 UIMessage uses `parts` array; older format uses `content` string
        role: z.enum(["user", "assistant", "system", "tool"]),
        content: z.string().optional(),
        parts: z.array(z.object({ type: z.string() }).passthrough()).optional(),
      })
      .passthrough()
  ),
  postId: z.string().optional(),
});

export async function POST(req: Request) {
  if (!isValidCsrfRequest(req)) {
    return csrfErrorResponse();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return unauthorized();
  }

  const rateLimitResult = applyRateLimit({
    key: buildRateLimitKey("chat", req, session.user.id),
    maxRequests: CHAT_RATE_LIMIT.maxRequests,
    windowMs: CHAT_RATE_LIMIT.windowMs,
  });

  if (!rateLimitResult.allowed) {
    return apiError("Too many chat requests. Please try again later.", 429);
  }

  try {
    const body = await req.json();
    const { messages, postId } = chatSchema.parse(body);

    let systemMessage = `You are a helpful assistant that can answer questions about blog posts and help users understand the content.`;

    if (postId) {
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { title: true, content: true },
      });

      if (post) {
        const truncatedContent =
          post.content.length > 10000
            ? post.content.slice(0, 10000) + "...[content truncated]"
            : post.content;

        systemMessage += `\n\nUser is currently reading the post titled "${post.title}".\n\nContent of the post:\n${truncatedContent}\n\nAnswer user questions based on this content. if the question is not related to the post, you can answer it based on your general knowledge.`;
      }
    }

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: systemMessage,
      messages: convertToModelMessages(messages as never),
    });

    return result.toUIMessageStreamResponse({
      headers: getRateLimitHeaders(rateLimitResult),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return validationError(error.issues);
    }
    console.error("Error in Chat API:", error);
    return serverError();
  }
}
