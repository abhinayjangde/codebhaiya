import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

export default async function Creators() {
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

  // fetching all users
  const users = await prisma.user.findMany({
    where: {
      role: "CREATOR",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });

  return (
    <div className="min-h-screen dark:bg-background py-5 bg-gray-50 p-4 lg:py-8">
      <div className="max-w-full bg-white dark:bg-black/30 rounded-lg shadow-md p-6 lg:p-8 z-0 relative">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white mb-6 border-b pb-4">
          Creators
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
                {users.map((u: User) => (
                  <tr
                    key={u.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{u.name}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">{u.role}</td>
                    <td className="px-6 py-4">
                      {new Date(u.createdAt).toLocaleDateString()}
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
