import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { Mail, Calendar, User } from "lucide-react";

export const metadata = {
  title: "Admin - Messages | CodeBhaiya",
};

export default async function AdminMessagesPage() {
  const messages = await prisma.contactSubmission.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 lg:p-10 w-full max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">Contact Messages</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          View all messages submitted through the contact form.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center">
          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium dark:text-gray-300">
            No messages yet
          </h3>
          <p className="text-gray-500 dark:text-gray-500 mt-1">
            When users contact you, their messages will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold">
                    <User className="w-4 h-4 text-gray-400" />
                    {msg.name}
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${msg.email}`} className="hover:underline">
                      {msg.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                  <Calendar className="w-3 h-3" />
                  {formatDistanceToNow(new Date(msg.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800/60">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
