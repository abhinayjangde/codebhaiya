import { sendPasswordResetEmail } from "@/helpers/sendPasswordResetEmail";
import db from "@/lib/db";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
      try {
            await db()
            const { email } = await request.json();
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                  return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
            }
            const passwordResetCode = Math.floor(100000 + Math.random() * 900000).toString()
            if (user) {
                  user.verifyCode = passwordResetCode
                  user.verifyCodeExpiry = new Date(Date.now() + 3600000)
                  await user.save()
            }
            // send verification email    
            const emailResponse = await sendPasswordResetEmail(
                  email,
                  user.username,
                  passwordResetCode
            )
            if (!emailResponse.success) {
                  return NextResponse.json({ success: false, message: "Failed to send password reset email" }, { status: 500 });
            }
            return NextResponse.json({ success: true, message: "Password reset code send successful on your email" }, { status: 200 });

      } catch (error: any) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

}
export async function PUT(request: Request) {
      try {
            await db()
            const { email, resetCode, newPassword } = await request.json();
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            const user = await UserModel.findOne({ email: email });
            const isCodeValid = user?.verifyCode === resetCode
            const isCodeNotExpired = new Date(user?.verifyCodeExpiry!) > new Date()
            if (isCodeValid && isCodeNotExpired) {
                  if (user) {
                        user.password = hashedPassword;
                        user.isVerified = true;
                        await user.save();
                  }
                  return NextResponse.json({ success: true, message: "Password reset successfully." }, { status: 201 });
            }
            else if (!isCodeNotExpired) {
                  return NextResponse.json({
                        success: false,
                        message: "Verification code has expired, please reset otp again to get a new code"
                  }, { status: 400 })
            }
            else {
                  return NextResponse.json({
                        success: false,
                        message: "Invalid verification code"
                  }, { status: 400 })
            }
            
      } catch (error: any) {
            return NextResponse.json({ success: false, message: error.message }, { status: 404 });
      }

}