import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const commentSchema = z.object({
    content: z.string().min(1),
    parentId: z.string().optional(),
});

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: postId } = await params;
    const userId = session.user.id;

    try {
        const body = await req.json();
        const { content, parentId } = commentSchema.parse(body);

        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
                authorId: userId,
                parentId,
            },
        });

        return NextResponse.json(comment);
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id: postId } = await params;

    const comments = await prisma.comment.findMany({
        where: { postId },
        include: {
            author: {
                select: {
                    name: true,
                    image: true
                }
            }
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    return NextResponse.json(comments);
}
