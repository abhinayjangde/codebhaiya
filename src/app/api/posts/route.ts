import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { apiSuccess, apiError, validationError } from "@/lib/api-response";
import { requireCreator } from "@/lib/session";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  featuredImg: z.string().optional(),
  video: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  contentFormat: z.enum(["HTML", "MARKDOWN"]).optional(),
});

export async function POST(req: Request) {
  const { user, error: authError } = await requireCreator();
  if (authError) return authError;

  try {
    const body = await req.json();
    const validatedData = postSchema.parse(body);

    const post = await prisma.post.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        slug: validatedData.slug,
        excerpt: validatedData.excerpt || null,
        featuredImg: validatedData.featuredImg || null,
        video: validatedData.video || null,
        category: validatedData.category || null,
        tags: validatedData.tags || [],
        published: validatedData.published || false,
        authorId: user!.id,
        publishedAt: validatedData.published ? new Date() : null,
      },
    });

    if (validatedData.contentFormat === "MARKDOWN") {
      await prisma.$executeRaw`UPDATE "Post" SET "contentFormat" = 'MARKDOWN'::"ContentFormat" WHERE id = ${post.id}`;
      return apiSuccess({ ...post, contentFormat: "MARKDOWN" });
    }

    return apiSuccess(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return validationError(error.issues);
    }
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return apiError("Invalid request", 400, errorMessage);
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const tag = searchParams.get("tag");
  const search = searchParams.get("q");

  const where: Prisma.PostWhereInput = {
    published: true,
  };

  if (tag) {
    where.tags = { has: tag };
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.post.count({ where }),
  ]);

  return apiSuccess(posts, 200, {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}
