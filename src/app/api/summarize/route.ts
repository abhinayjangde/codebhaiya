import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    // Fetch post with cached summary
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, title: true, content: true, summary: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Return cached summary if available
    if (post.summary) {
      return NextResponse.json({
        summary: post.summary,
        cached: true,
      });
    }

    // Generate new summary using Gemini
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
${post.content}

Provide ONLY the summary, no prefixes like "TL;DR:" or "Summary:".`,
    });

    const summary = result.text.trim();

    // Cache the summary in the database
    await prisma.post.update({
      where: { id: postId },
      data: { summary },
    });

    return NextResponse.json({
      summary,
      cached: false,
    });
  } catch (error) {
    console.error("Error generating summary:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
