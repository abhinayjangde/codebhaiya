import Razorpay from "razorpay";
import env from "@/config/env";

export function getRazorpayClient() {
  if (!env.razorpay.keyId || !env.razorpay.keySecret) {
    throw new Error("Razorpay credentials are not configured");
  }

  return new Razorpay({
    key_id: env.razorpay.keyId,
    key_secret: env.razorpay.keySecret,
  });
}