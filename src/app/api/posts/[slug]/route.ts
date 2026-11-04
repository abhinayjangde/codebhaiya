import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { deleteImageFromCloudinary } from "@/lib/cloudinary";
import {
  apiSuccess,
  apiError,
  unauthorized,
  forbidden,
  validationError,
  notFound,
} from "@/lib/api-response";
import { getAuthenticatedUserWithRole } from "@/lib/session";
import { sanitizeHtml } from "@/lib/html-sanitizer";
import { z } from "zod";

const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().nullable().optional(),
  featuredImg: z.string().nullable().optional(),
  video: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  contentFormat: z.enum(["HTML", "MARKDOWN"]).optional(),
});

function isPrismaUniqueConstraintError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return error.code === "P2002";
  }
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "P2002"
  );
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getAuthenticatedUserWithRole();
  if (!session) {
    return unauthorized();
  }

  const { slug } = await params;

  const post = await prisma.post.findFirst({
    where: {
      OR: [{ id: slug }, { slug }],
    },
  });

  if (!post) {
    return notFound("Post not found");
  }

  if (post.authorId !== session.id && session.role !== "ADMIN") {
    return forbidden();
  }

  try {
    const body = await req.json();
    const validatedData = updatePostSchema.parse(body);

    const { contentFormat: requestedFormat, ...otherFields } = validatedData;
    const contentFormat = requestedFormat ?? post.contentFormat;

    if (
      otherFields.featuredImg &&
      post.featuredImg &&
      otherFields.featuredImg !== post.featuredImg
    ) {
      await deleteImageFromCloudinary(post.featuredImg);
    }

    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: {
        ...otherFields,
        contentFormat,
        ...(otherFields.content
          ? {
              content:
                contentFormat === "MARKDOWN"
                  ? otherFields.content
                  : sanitizeHtml(otherFields.content),
            }
          : {}),
        publishedAt:
          validatedData.published === true
            ? new Date()
            : validatedData.published === false
              ? null
              : post.publishedAt,
      },
    });

    return apiSuccess({ id: updatedPost.id, slug: updatedPost.slug });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return validationError(error.issues);
    }
    if (isPrismaUniqueConstraintError(error)) {
      return apiError(
        "Slug already exists",
        409,
        "Choose a different slug for this post."
      );
    }
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return apiError("Invalid request", 400, errorMessage);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getAuthenticatedUserWithRole();
  if (!session) {
    return unauthorized();
  }

  const { slug } = await params;

  const post = await prisma.post.findFirst({
    where: {
      OR: [{ id: slug }, { slug }],
    },
  });

  if (!post) {
    return notFound("Post not found");
  }

  if (post.authorId !== session.id && session.role !== "ADMIN") {
    return forbidden();
  }

  await prisma.post.delete({
    where: { id: post.id },
  });

  return apiSuccess({ success: true });
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const post = await prisma.post.findFirst({
    where: {
      published: true,
      OR: [{ id: slug }, { slug }],
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
          id: true,
        },
      },
    },
  });

  if (!post) {
    return notFound("Post not found");
  }

  return apiSuccess(post);
}
