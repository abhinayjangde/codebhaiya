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

  // Redirect logged-in users away from auth pages
  const authPages = ["/login", "/register"];
  if (sessionCookie && authPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
