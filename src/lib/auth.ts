import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { sendVerificationEmail, sendPasswordResetEmail } from "./email";
import env from "@/config/env";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
}

interface SessionData {
  token: string;
  userId: string;
  expiresAt: Date;
}

export const auth = betterAuth({
  secret: env.betterAuthSecret,
  baseURL: env.betterAuthUrl,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // Require email verification before login
    requireEmailVerification: true, // Block login if email not verified, auto-sends new verification email
    sendResetPassword: async ({ user, url }) => {
      try {
        await sendPasswordResetEmail(user.email, url, user.name);
      } catch (error) {
        console.error("[Auth] Failed to send password reset email:", error);
      }
    },
    resetPasswordTokenExpiresIn: 600, // 10 minutes in seconds
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await sendVerificationEmail(user.email, url, user.name);
      } catch (error) {
        console.error("[Auth] Failed to send verification email:", error);
      }
    },
    sendOnSignUp: true, // Automatically send verification email on signup
    autoVerify: false, // Don't auto-verify - require clicking the email link
  },
  callbacks: {
    session: async ({
      session,
      user,
    }: {
      session: SessionData;
      user: SessionUser;
    }) => {
      return {
        ...session,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        },
      };
    },
  },
});
