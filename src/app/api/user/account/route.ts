import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyPassword } from "better-auth/crypto";

const deleteAccountSchema = z.object({
    password: z.string().min(1, "Password is required"),
});

export async function DELETE(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { password } = deleteAccountSchema.parse(body);

        // Get the account with password
        const account = await prisma.account.findFirst({
            where: {
                userId: session.user.id,
                providerId: "credential",
            },
        });

        if (!account || !account.password) {
            return NextResponse.json(
                { error: "Account not found or no password set" },
                { status: 400 }
            );
        }

        // Verify password
        const isValidPassword = await verifyPassword({ hash: account.password, password });

        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Incorrect password" },
                { status: 401 }
            );
        }

        // Delete the user - Prisma cascade will handle related records
        await prisma.user.delete({
            where: { id: session.user.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Password is required" },
                { status: 422 }
            );
        }
        console.error("DELETE_ACCOUNT_ERROR", error);
        return NextResponse.json(
            { error: "Failed to delete account" },
            { status: 500 }
        );
    }
}
