import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface PostWithAuthor {
  id: string;
  title: string;
  published: boolean;
  createdAt: Date;
  author: {
    name: string | null;
  };
}

export default async function Posts() {
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

  if (role !== "ADMIN") {
    redirect("/dashboard");
  }

  // fetching all posts
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
    include: {
      author: true,
    },
  });

  return (
    <div className="min-h-screen dark:bg-background py-5 bg-gray-50 p-4 lg:py-8">
      <div className="max-w-full bg-white dark:bg-black/30 rounded-lg shadow-md p-6 lg:p-8 z-0 relative">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white mb-6 border-b pb-4">
          Posts
        </h1>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
          <div className="border rounded-md overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Author</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p: PostWithAuthor) => (
                  <tr
                    key={p.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{p.title}</td>
                    <td className="px-6 py-4">{p.author.name}</td>
                    <td className="px-6 py-4">
                      {p.published ? "Published" : "Draft"}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
