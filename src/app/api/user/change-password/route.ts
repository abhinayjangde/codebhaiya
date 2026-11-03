import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyPassword, hashPassword } from "better-auth/crypto";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validationResult = changePasswordSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues;
      return NextResponse.json({ error: errors[0].message }, { status: 422 });
    }

    const { currentPassword, newPassword } = validationResult.data;

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

    // Verify current password
    const isValidPassword = await verifyPassword({
      hash: account.password,
      password: currentPassword,
    });

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // Hash new password and update
    const hashedNewPassword = await hashPassword(newPassword);

    await prisma.account.update({
      where: { id: account.id },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("CHANGE_PASSWORD_ERROR", error);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}
