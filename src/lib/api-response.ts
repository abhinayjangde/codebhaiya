import { NextResponse } from "next/server";
import { z } from "zod";

export type ApiError = {
  error: string;
  details?: unknown;
};

export type ApiSuccess<T> = {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
};

export function apiSuccess<T>(
  data: T,
  status: number = 200,
  meta?: ApiSuccess<T>["meta"]
): NextResponse<ApiSuccess<T>> {
  return NextResponse.json({ data, meta }, { status });
}

export function apiError(
  message: string,
  status: number = 400,
  details?: unknown
): NextResponse<ApiError> {
  return NextResponse.json({ error: message, details }, { status });
}

export function unauthorized(
  message: string = "Unauthorized"
): NextResponse<ApiError> {
  return apiError(message, 401);
}

export function forbidden(
  message: string = "Forbidden"
): NextResponse<ApiError> {
  return apiError(message, 403);
}

export function notFound(
  message: string = "Not found"
): NextResponse<ApiError> {
  return apiError(message, 404);
}

export function validationError(
  details: z.ZodError["issues"]
): NextResponse<ApiError> {
  return apiError("Validation failed", 400, details);
}

export function serverError(
  message: string = "Internal server error"
): NextResponse<ApiError> {
  return apiError(message, 500);
}
