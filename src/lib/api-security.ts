import env from "@/config/env";
import { NextResponse } from "next/server";

const STATE_CHANGING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function safeGetOrigin(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function isStateChangingMethod(method: string) {
  return STATE_CHANGING_METHODS.has(method.toUpperCase());
}

export function isValidCsrfRequest(req: Request) {
  if (!isStateChangingMethod(req.method)) {
    return true;
  }

  const sourceOrigin =
    safeGetOrigin(req.headers.get("origin")) ||
    safeGetOrigin(req.headers.get("referer"));

  if (!sourceOrigin) {
    return false;
  }

  const allowedOrigins = new Set<string>();
  const baseOrigin = safeGetOrigin(env.baseUrl);
  const authOrigin = safeGetOrigin(env.betterAuthUrl);

  if (baseOrigin) {
    allowedOrigins.add(baseOrigin);
  }
  if (authOrigin) {
    allowedOrigins.add(authOrigin);
  }

  return allowedOrigins.has(sourceOrigin);
}

export function csrfErrorResponse() {
  return NextResponse.json(
    { error: "Invalid CSRF origin" },
    {
      status: 403,
    }
  );
}
