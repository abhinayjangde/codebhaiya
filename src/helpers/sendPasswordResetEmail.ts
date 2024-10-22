import { resend } from "@/lib/resend"
import PasswordResetEmail from "../../emails/PasswordResetEmail"
import { ApiResponse } from "@/types/ApiResponse"

export async function sendPasswordResetEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'CodeBhaiya | Password Reset Code',
            react: PasswordResetEmail({username:username, otp:verifyCode})
        });
        return { success: true, message: "Password reset email send successfully." }
    } catch (error) {
        console.error("Error sending password reset code email.", error)
        return { success: false, message: "Failed to send verification email" }
    }
}