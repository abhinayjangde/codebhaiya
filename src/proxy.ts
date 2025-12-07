import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { handles } from "@/helpers/handles";

export default function proxy(request: NextRequest) {
  // handling social redirects
  const url = request.nextUrl.pathname.slice(1);
  if (url in handles) {
    return NextResponse.redirect(new URL(handles[url as keyof typeof handles]));
  }

  // Auth protection for dashboard
  const sessionCookie = request.cookies.get("better-auth.session_token");
  if (!sessionCookie && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
