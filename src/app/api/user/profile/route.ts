import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const profileSchema = z.object({
    name: z.string().min(2),
    image: z.string().url().optional().or(z.literal("")),
    bio: z.string().max(500).optional(),
});

export async function PUT(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name, image, bio } = profileSchema.parse(body);

        // Update User
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
                image,
            },
        });

        // Update or Create Profile
        await prisma.profile.upsert({
            where: { userId: session.user.id },
            update: { bio },
            create: {
                userId: session.user.id,
                bio,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid request data", { status: 422 });
        }
        console.error("PROFILE_UPDATE_ERROR", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
