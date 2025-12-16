import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { deleteImageFromCloudinary } from "@/lib/cloudinary";
import { z } from "zod";

const updatePostSchema = z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    slug: z.string().min(1).optional(),
    excerpt: z.string().optional(),
    featuredImg: z.string().optional(),
    video: z.string().nullable().optional(),
    category: z.string().nullable().optional(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
    contentFormat: z.enum(["HTML", "MARKDOWN"]).optional(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const user = session.user;

    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check ownership or admin
    // @ts-ignore
    if (post.authorId !== user.id && user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await req.json();
        const validatedData = updatePostSchema.parse(body);

        // Destructure contentFormat from validatedData to handle it separately
        const { contentFormat: requestedFormat, ...otherFields } = validatedData;

        if (otherFields.featuredImg && post.featuredImg && otherFields.featuredImg !== post.featuredImg) {
             // Delete old image if it's different and exists
             await deleteImageFromCloudinary(post.featuredImg);
        }

        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                ...otherFields,
                publishedAt: validatedData.published === true ? new Date() : (validatedData.published === false ? null : post.publishedAt),
            },
        });

        // Update contentFormat using raw SQL if a new format was provided (workaround for Prisma enum issue)
        if (requestedFormat) {
            const formatValue = requestedFormat === "MARKDOWN" ? "MARKDOWN" : "HTML";
            await prisma.$executeRaw`UPDATE "Post" SET "contentFormat" = ${formatValue}::"ContentFormat" WHERE id = ${id}`;
            return NextResponse.json({ ...updatedPost, contentFormat: formatValue });
        }

        return NextResponse.json(updatedPost);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Post update error:", errorMessage);
        return NextResponse.json({ error: "Invalid request", details: errorMessage }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const user = session.user;

    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check ownership or admin
    // @ts-ignore
    if (post.authorId !== user.id && user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.post.delete({
        where: { id },
    });

    return NextResponse.json({ success: true });
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    name: true,
                    image: true,
                    id: true
                }
            },
        }
    });

    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
}
