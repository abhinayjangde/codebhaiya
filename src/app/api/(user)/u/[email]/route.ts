// api/(users)/u/[username]/route.ts
import { NextRequest, NextResponse } from "next/server"
import db from "@/lib/db";
import User from "@/models/User";

export const GET = async (request: NextRequest, response: any) => {
    try {
        await db();
        const {email} = response.params
        const user = await User.findOne({ email: email}).select({ password: 0, verifyCode: 0, verifyCodeExpiry: 0, isVerified: 0, createdAt: 0, updatedAt: 0 })
        if (!user) {
            return NextResponse.json({ error: "User does not exists." }, { status: 400 })
        }
        const res = NextResponse.json({
            message: "User Data fetched successfully",
            success: true,
            data: user
        })
        return res

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export const PUT = async (request: NextRequest) => {
    try {
        await db();
        const email = request.url
        const reqBody = await request.json()
        console.log(reqBody)
        const user = await User.findOneAndUpdate({ email: email.split("/")[5] }, reqBody, { new: true })
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User does not exists."
            }, { status: 400 })
        }
        return NextResponse.json({
            success: true,
            message: "User profile updated successfully",
            data: user
        })
    }
    catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            message: "User does not exists."
        },
            { status: 500 })
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        await db();
        const email = request.url
        const user = await User.findOneAndDelete({ email: email.split("/")[5] })
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User does not exists."
            }, { status: 400 })
        }
        return NextResponse.json({
            success: true,
            message: "User deleted successfully",
            data: user
        })
    }
    catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            message: "User does not exists."
        },
            { status: 500 })
    }
}