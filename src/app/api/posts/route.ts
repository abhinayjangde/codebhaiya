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
    contentFormat: z.enum(["HTML", "MARKDOWN"]).optional(),
});

export async function POST(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user;

    // Fetch role from database to ensure accuracy
    const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true }
    });

    const role = dbUser?.role;

    if (role !== "CREATOR" && role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await req.json();
        console.log("Received post body:", JSON.stringify(body, null, 2));
        
        const validatedData = postSchema.parse(body);

        // Create post without contentFormat (uses DB default: HTML)
        const post = await prisma.post.create({
            data: {
                title: validatedData.title,
                content: validatedData.content,
                slug: validatedData.slug,
                excerpt: validatedData.excerpt || null,
                featuredImg: validatedData.featuredImg || null,
                tags: validatedData.tags || [],
                published: validatedData.published || false,
                authorId: user.id,
                publishedAt: validatedData.published ? new Date() : null,
            },
        });

        // If MARKDOWN format was selected, update using raw SQL (workaround for Prisma enum issue)
        if (validatedData.contentFormat === "MARKDOWN") {
            await prisma.$executeRaw`UPDATE "Post" SET "contentFormat" = 'MARKDOWN'::"ContentFormat" WHERE id = ${post.id}`;
            // Return the post with the correct contentFormat
            return NextResponse.json({ ...post, contentFormat: "MARKDOWN" });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error("Post creation error:", error);
        if (error instanceof z.ZodError) {
            console.error("Validation errors:", error.issues);
            return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
        }
        // Return detailed error for debugging
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Full error details:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
        return NextResponse.json({ error: "Invalid request", details: errorMessage }, { status: 400 });
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
