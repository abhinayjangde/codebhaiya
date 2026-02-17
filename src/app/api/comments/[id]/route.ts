import prisma from "@/lib/prisma";
import {
  apiSuccess,
  unauthorized,
  forbidden,
  notFound,
} from "@/lib/api-response";
import { getAuthenticatedUserWithRole } from "@/lib/session";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAuthenticatedUserWithRole();
  if (!session) {
    return unauthorized();
  }

  const { id } = await params;

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) {
    return notFound("Comment not found");
  }

  if (comment.authorId !== session.id && session.role !== "ADMIN") {
    return forbidden();
  }

  await prisma.comment.delete({
    where: { id },
  });

  return apiSuccess({ success: true });
}
