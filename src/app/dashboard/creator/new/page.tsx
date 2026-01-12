import PostEditor from "@/components/editor/post-editor";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

export default async function NewPostPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  const role = dbUser?.role;

  if (role !== "CREATOR" && role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto px-4">
      <PostEditor userId={user.id} />
    </div>
  );
}
