import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

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
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  callbacks: {
    session: async ({ session, user }: { session: SessionData; user: SessionUser }) => {
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
