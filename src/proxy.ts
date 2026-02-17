import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { handles } from "@/helpers/handles";
import { csrfErrorResponse, isStateChangingMethod, isValidCsrfRequest } from "@/lib/api-security";

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api")) {
    const isAuthApi = request.nextUrl.pathname.startsWith("/api/auth");

    if (
      !isAuthApi &&
      isStateChangingMethod(request.method) &&
      !isValidCsrfRequest(request)
    ) {
      return csrfErrorResponse();
    }

    return NextResponse.next();
  }

  // handling social redirects
  const url = request.nextUrl.pathname.slice(1);
  if (url in handles) {
    return NextResponse.redirect(new URL(handles[url as keyof typeof handles]));
  }

  // Auth protection for dashboard
  const sessionCookie =
    request.cookies.get("__Secure-better-auth.session_token") ||
    request.cookies.get("better-auth.session_token");
  if (!sessionCookie && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    sessionCookie &&
    (request.nextUrl.pathname.startsWith("/forgot-password") ||
      request.nextUrl.pathname.startsWith("/reset-password"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect logged-in users away from auth pages
  const authPages = ["/login", "/register"];
  if (sessionCookie && authPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
