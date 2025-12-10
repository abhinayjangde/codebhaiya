import { google } from "@ai-sdk/google";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { prisma } from "@/lib/prisma";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, postId } = await req.json();

    let systemMessage = `You are a helpful assistant that can answer questions about blog posts and help users understand the content.`;

    if (postId) {
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { title: true, content: true },
      });

      if (post) {
        systemMessage += `\n\nUser is currently reading the post titled "${post.title}".\n\nContent of the post:\n${post.content}\n\nAnswer user questions based on this content. if the question is not related to the post, you can answer it based on your general knowledge.`;
      }
    }

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: systemMessage,
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error in Chat API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}