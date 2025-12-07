import PostEditor from "@/components/editor/post-editor";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NewPostPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const user = session.user;
    // @ts-ignore
    if (user.role !== "CREATOR" && user.role !== "ADMIN") {
        redirect("/dashboard");
    }

    return (
        <div className="container mx-auto">
            <PostEditor />
        </div>
    );
}
