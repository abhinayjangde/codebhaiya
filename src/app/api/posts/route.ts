import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const postSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    slug: z.string().min(1),
    excerpt: z.string().optional(),
    featuredImg: z.string().optional(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
});

export async function POST(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user;
    // @ts-ignore - role is added via config but types might not be updated yet
    if (user.role !== "CREATOR" && user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await req.json();
        const validatedData = postSchema.parse(body);

        const post = await prisma.post.create({
            data: {
                ...validatedData,
                authorId: user.id,
                publishedAt: validatedData.published ? new Date() : null,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const tag = searchParams.get("tag");
    const search = searchParams.get("q");

    const where: any = {
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

    const posts = await prisma.post.findMany({
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
    });

    const total = await prisma.post.count({ where });

    return NextResponse.json({
        data: posts,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    });
}
