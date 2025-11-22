import { NextResponse, NextRequest } from "next/server";
import { handles } from "@/helpers/handles";

export default function proxy(request: NextRequest) {
  // handling social redirects
  const url = request.nextUrl.pathname.slice(1);
  if (url in handles) {
    return NextResponse.redirect(new URL(handles[url as keyof typeof handles]));
  }

  return NextResponse.next();
}
