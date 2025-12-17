"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, UserPen, Shield, FileText, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    name: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    name: "Creators",
    href: "/dashboard/admin/creators",
    icon: UserPen,
  },
  {
    name: "Admin",
    href: "/dashboard/admin",
    icon: Shield,
  },
  {
    name: "Posts",
    href: "/dashboard/admin/posts",
    icon: FileText,
  },
  {
    name: "Comments",
    href: "/dashboard/admin/comments",
    icon: MessageSquare,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen dark:bg-background py-5 bg-gray-50 p-4 lg:py-8">
      <div className="max-w-full bg-white dark:bg-black/30 rounded-lg shadow-md p-6 lg:p-8 z-0 relative">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <h2 className="dark:text-white font-semibold text-lg">Admin Panel</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard/admin" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive ? "text-yellow-400" : "text-gray-500"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
