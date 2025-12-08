import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import SettingsForm from "./settings-form";
import DeleteAccountDialog from "./delete-account-dialog";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { profile: true },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen dark:bg-background py-5 bg-gray-50 md:p-4 lg:p-12">
      <div className="max-w-screen-lg mx-auto bg-white dark:bg-black/[0.3] rounded-lg shadow-md p-6 lg:p-10 z-0 relative">
        <h1 className="text-center text-xl md:text-3xl justify-center lg:text-4xl font-semibold text-gray-800 dark:text-white mb-1 flex border-b pb-2">
          Settings
        </h1>

        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <SettingsForm user={user} />
        </div>

        {/* Danger Zone */}
        <div className="mt-8 bg-card border border-destructive/30 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-destructive mb-2">
            Danger Zone
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <DeleteAccountDialog />
        </div>
      </div>
    </div>
  );
}
