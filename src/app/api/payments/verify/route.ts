import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { apiError, apiSuccess, serverError, validationError } from "@/lib/api-response";
import env from "@/config/env";
import { requireAuth } from "@/lib/session";

const verifyPaymentSchema = z.object({
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

function isValidSignature(orderId: string, paymentId: string, signature: string) {
  if (!env.razorpay.keySecret) return false;

  const expected = createHmac("sha256", env.razorpay.keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(signature, "utf8");

  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

export async function POST(req: Request) {
  const { user, error: authError } = await requireAuth();
  if (authError) return authError;

  const parsedBody = verifyPaymentSchema.safeParse(await req.json());
  if (!parsedBody.success) return validationError(parsedBody.error.issues);

  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = parsedBody.data;
  if (!isValidSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature)) {
    return apiError("Invalid payment signature", 400);
  }

  try {
    const result = await prisma.$transaction(async (transaction) => {
      const order = await transaction.order.findUnique({
        where: { razorpayOrderId },
        select: {
          id: true,
          userId: true,
          courseId: true,
          status: true,
          razorpayPaymentId: true,
        },
      });

      if (!order || order.userId !== user!.id) {
        return { error: apiError("Payment order not found", 404) };
      }

      if (order.status === "PAID") {
        return { orderId: order.id, courseId: order.courseId };
      }

      if (order.status !== "PENDING") {
        return { error: apiError("Payment order cannot be completed", 409) };
      }

      await transaction.order.update({
        where: { id: order.id },
        data: {
          razorpayPaymentId,
          razorpaySignature,
          status: "PAID",
        },
      });

      await transaction.enrollment.upsert({
        where: {
          userId_courseId: {
            userId: order.userId,
            courseId: order.courseId,
          },
        },
        create: {
          userId: order.userId,
          courseId: order.courseId,
        },
        update: {},
      });

      return { orderId: order.id, courseId: order.courseId };
    });

    if ("error" in result) return result.error;
    return apiSuccess({ ...result, paid: true });
  } catch (error) {
    console.error("Failed to verify Razorpay payment", error);
    return serverError("Unable to verify payment");
  }
}