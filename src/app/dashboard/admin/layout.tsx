import { AdminSidebar } from "@/components/dashboard/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <AdminSidebar />
      <main>{children}</main>
    </div>
  );
}
