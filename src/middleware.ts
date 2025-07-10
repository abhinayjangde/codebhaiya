
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
    if (token?.role !== "CREATOR" && url.pathname.startsWith('/creator')) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (token?.role !== "ADMIN" && url.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // if (!token && (url.pathname.startsWith("/verification") || url.pathname.startsWith("/dashboard"))) {
    //     return NextResponse.redirect(new URL('/', request.url))
    // }
    if (url.pathname === '/discord') {
        return NextResponse.redirect(process.env.DISCORD_INVITE!);
    }
    if (url.pathname === '/youtube') {
        return NextResponse.redirect(process.env.YOUTUBE_CHANNEL!);
    }
    if (url.pathname === '/instagram') {
        return NextResponse.redirect(process.env.INSTAGRAM_URL!);
    }
    if (url.pathname === '/linkedin') {
        return NextResponse.redirect(process.env.LINKEDIN_URL!);
    }
    if (url.pathname === '/x') {
        return NextResponse.redirect(process.env.TWITTER_URL!);
    }
    if (url.pathname === '/github') {
        return NextResponse.redirect(process.env.GITHUB_URL!);
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
        '/admin/:path*',
        '/discord',
        '/youtube',
        '/instagram',
        '/linkedin',
        '/x',
        '/github',],
};
