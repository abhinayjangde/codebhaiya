
import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET!
    })
    // console.log("token", token)
    const url = request.nextUrl.clone();
    if (url.pathname.startsWith('/notes') || url.pathname.startsWith('/abhinayjangde')) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if(token?.role !== "CREATOR" && url.pathname.startsWith('/creator')) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if(token?.role !== "ADMIN" && url.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if(!token && (url.pathname.startsWith("/verification") || url.pathname.startsWith("/dashboard")) ){
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next();
}
export default middleware

export const config = {
    matcher: ['/notes/:path*',
        '/abhinayjangde',
        '/creator/:path*',
        '/signin',
        '/signup',
        '/verification/:path*', 
        '/dashboard/:path*',
        '/admin/:path*'],
};
