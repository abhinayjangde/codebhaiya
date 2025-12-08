import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const user = session.user;

    const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true }
    });

    const role = dbUser?.role;

    if (role !== "ADMIN") {
        redirect("/dashboard");
    }

    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 20,
    });

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
        <div className="min-h-screen dark:bg-background py-5 bg-gray-50 md:p-4 lg:p-12">
      <div className="max-w-screen-lg mx-auto bg-white dark:bg-black/[0.3] rounded-lg shadow-md p-6 lg:p-10 z-0 relative">
        <h1 className="text-center text-xl md:text-3xl justify-center lg:text-4xl font-semibold text-gray-800 dark:text-white mb-1 flex border-b pb-2">
          Admin Dashboard
        </h1>
            

            <div>
                <h2 className="text-2xl font-semibold mb-4">Recent Users</h2>
                <div className="border rounded-md overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">{u.name}</td>
                                    <td className="px-6 py-4">{u.email}</td>
                                    <td className="px-6 py-4">{u.role}</td>
                                    <td className="px-6 py-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

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
                            {posts.map((p) => (
                                <tr key={p.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">{p.title}</td>
                                    <td className="px-6 py-4">{p.author.name}</td>
                                    <td className="px-6 py-4">{p.published ? "Published" : "Draft"}</td>
                                    <td className="px-6 py-4">{new Date(p.createdAt).toLocaleDateString()}</td>
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
