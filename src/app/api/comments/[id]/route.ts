import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const user = session.user;

    const comment = await prisma.comment.findUnique({
        where: { id },
    });

    if (!comment) {
        return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Check ownership or admin
    // @ts-ignore
    if (comment.authorId !== user.id && user.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.comment.delete({
        where: { id },
    });

    return NextResponse.json({ success: true });
}
