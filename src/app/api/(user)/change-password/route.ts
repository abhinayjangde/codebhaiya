import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import db from "@/lib/db";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await db()
    try {
        const { email, oldPassword, newPassword } = await request.json()
        const user = await UserModel.findOne({ email: email })
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isPasswordMatch) {
            return NextResponse.json({
                success: false,
                message: "Old password is incorrect"
            }, { status: 400 })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()
        return NextResponse.json({
            success: true,
            message: "Password changed successfully"
        }, { status: 200 })
    }
    catch (error: any) {
        console.error("Error changing password", error)
        return NextResponse.json({
            success: false,
            message: "Error changing password"
        }, { status: 500 })
    }
}