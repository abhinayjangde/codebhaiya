import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: postId } = await params;
    const userId = session.user.id;

    // Check if post exists
    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
        where: {
            userId_postId: {
                userId,
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
        return NextResponse.json({ liked: false });
    } else {
        await prisma.like.create({
            data: {
                userId,
                postId,
            },
        });
        return NextResponse.json({ liked: true });
    }
}
