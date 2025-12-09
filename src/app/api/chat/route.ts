import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import prisma from "@/lib/prisma";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, postId } = await req.json();

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  const result = streamText({
    model: google("gemini-1.5-flash"),
    system: `You are a helpful assistant. You are capable of answering questions about the blog post titled "${post.title}".
    
    Here is the content of the blog post:
    ${post.content}
    
    Please answer the user's questions based on the content of the blog post. If the answer is not in the blog post, you can use your general knowledge but mention that it's not explicitly in the post. Keep your answers concise and relevant.`,
    messages,
  });

  return result.toDataStreamResponse();
}