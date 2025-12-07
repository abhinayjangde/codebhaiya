"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    image: z.string().url("Invalid URL").optional().or(z.literal("")),
    bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface SettingsFormProps {
    user: any; // Using any for simplicity, ideally should be typed
}

export default function SettingsForm({ user }: SettingsFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name || "",
            image: user.image || "",
            bio: user.profile?.bio || "",
        },
    });

    async function onSubmit(data: ProfileFormValues) {
        setIsLoading(true);
        try {
            const response = await fetch("/api/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            toast.success("Profile updated successfully");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...form.register("name")} placeholder="Your name" />
                {form.formState.errors.name && (
                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL</Label>
                <Input id="image" {...form.register("image")} placeholder="https://example.com/avatar.jpg" />
                {form.formState.errors.image && (
                    <p className="text-sm text-red-500">{form.formState.errors.image.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                    Enter a URL for your profile picture.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                    id="bio"
                    {...form.register("bio")}
                    placeholder="Tell us about yourself"
                    className="min-h-[100px]"
                />
                {form.formState.errors.bio && (
                    <p className="text-sm text-red-500">{form.formState.errors.bio.message}</p>
                )}
            </div>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
            </Button>
        </form>
    );
}
