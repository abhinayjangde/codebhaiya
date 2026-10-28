import prisma from "@/lib/prisma";
import { apiSuccess, apiError, validationError } from "@/lib/api-response";
import { requireAuth } from "@/lib/session";
import { z } from "zod";

const commentSchema = z.object({
  content: z.string().min(1),
  parentId: z.string().optional(),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { user, error: authError } = await requireAuth();
  if (authError) return authError;

  const { slug: postId } = await params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId, published: true },
      select: { id: true },
    });

    if (!post) {
      return apiError("Post not found", 404);
    }

    const body = await req.json();
    const validatedData = commentSchema.parse(body);

    const comment = await prisma.comment.create({
      data: {
        content: validatedData.content,
        postId,
        authorId: user!.id,
        parentId: validatedData.parentId,
      },
    });

    return apiSuccess(comment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return validationError(error.issues);
    }
    return apiError("Invalid request", 400);
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug: postId } = await params;

  const post = await prisma.post.findUnique({
    where: { id: postId, published: true },
    select: { id: true },
  });

  if (!post) {
    return apiError("Post not found", 404);
  }

  const comments = await prisma.comment.findMany({
    where: { postId },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return apiSuccess(comments);
}
