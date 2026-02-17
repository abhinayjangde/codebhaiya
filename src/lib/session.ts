import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { apiError, unauthorized, forbidden } from "@/lib/api-response";

export type Role = "USER" | "CREATOR" | "ADMIN";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role?: Role;
};

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function getAuthenticatedUser() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  return session.user;
}

export async function getAuthenticatedUserWithRole() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      role: true,
    },
  });

  return user;
}

export async function requireAuth() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return { user: null, error: unauthorized() };
  }
  return { user, error: null };
}

export async function requireRole(allowedRoles: Role[]) {
  const user = await getAuthenticatedUserWithRole();
  if (!user) {
    return { user: null, error: unauthorized() };
  }

  if (!user.role || !allowedRoles.includes(user.role)) {
    return { user: null, error: forbidden("Insufficient permissions") };
  }

  return { user, error: null };
}

export async function requireCreator() {
  return requireRole(["CREATOR", "ADMIN"]);
}

export async function requireAdmin() {
  return requireRole(["ADMIN"]);
}
