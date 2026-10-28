import prisma from "@/lib/prisma";
import { apiSuccess, notFound } from "@/lib/api-response";
import { requireAuth } from "@/lib/session";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { user, error: authError } = await requireAuth();
  if (authError) return authError;

  const { slug: postId } = await params;

  const post = await prisma.post.findUnique({
    where: { id: postId, published: true },
  });

  if (!post) {
    return notFound("Post not found");
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: user!.id,
        postId,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
    return apiSuccess({ liked: false });
  } else {
    await prisma.like.create({
      data: {
        userId: user!.id,
        postId,
      },
    });
    return apiSuccess({ liked: true });
  }
}
