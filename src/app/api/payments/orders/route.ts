import { z } from "zod";
import prisma from "@/lib/prisma";
import { apiError, apiSuccess, serverError, validationError } from "@/lib/api-response";
import { getRazorpayClient } from "@/lib/razorpay";
import { requireAuth } from "@/lib/session";

const createOrderSchema = z.object({
  courseId: z.string().min(1),
});

export async function POST(req: Request) {
  const { user, error: authError } = await requireAuth();
  if (authError) return authError;

  const parsedBody = createOrderSchema.safeParse(await req.json());
  if (!parsedBody.success) return validationError(parsedBody.error.issues);

  const course = await prisma.course.findFirst({
    where: {
      id: parsedBody.data.courseId,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      title: true,
      price: true,
    },
  });

  if (!course) return apiError("Course not found", 404);
  if (course.price <= 0) return apiError("This course does not require payment", 400);

  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user!.id,
        courseId: course.id,
      },
    },
  });

  if (existingEnrollment) return apiError("You are already enrolled in this course", 409);

  try {
    const razorpayOrder = await getRazorpayClient().orders.create({
      amount: course.price,
      currency: "INR",
      receipt: `course_${course.id.slice(0, 12)}_${Date.now().toString(36)}`,
      notes: {
        courseId: course.id,
        userId: user!.id,
      },
    });

    const order = await prisma.order.create({
      data: {
        razorpayOrderId: razorpayOrder.id,
        userId: user!.id,
        courseId: course.id,
        amount: course.price,
      },
    });

    return apiSuccess(
      {
        orderId: order.id,
        razorpayOrderId: razorpayOrder.id,
        amount: order.amount,
        currency: order.currency,
        course: {
          id: course.id,
          title: course.title,
        },
      },
      201
    );
  } catch (error) {
    console.error("Failed to create Razorpay order", error);
    return serverError("Unable to create payment order");
  }
}