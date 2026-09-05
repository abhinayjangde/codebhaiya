import prisma from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "12");
  const search = searchParams.get("q")?.trim();
  const slug = searchParams.get("slug")?.trim();

  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 50) {
    return apiError("Invalid pagination parameters", 400);
  }

  const where = {
    status: "PUBLISHED" as const,
    ...(slug ? { slug } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnail: true,
        price: true,
        originalPrice: true,
        level: true,
        category: true,
        featured: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            lessons: true,
          },
        },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
    prisma.course.count({ where }),
  ]);

  return apiSuccess(courses, 200, {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}