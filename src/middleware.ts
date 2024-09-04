import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    // Get the token from the request using NextAuth's getToken method
    const token = await getToken({ req, secret });

    // Define the paths you want to protect
    const protectedPaths = ['/dashboard', '/profile', '/create-offer', '/create-test', '/take-test'];
    const { pathname, search } = req.nextUrl;
    // Check if the user is trying to access a protected path
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
    // If the path is protected and the user is not authenticated, redirect them
    if (isProtectedPath && !token) {
        const url = new URL('/login', req.url);
        const newUrl = pathname + search;
        url.searchParams.set('callbackUrl', newUrl);
        return NextResponse.redirect(url);
    }

    // If authenticated or accessing a public path, continue
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all routes that require authentication.
         * Add more patterns as needed.
         */
        '/dashboard/:path*',
        '/create-offer/:path*',
        '/create-test/:path*',
        '/take-test',
    ],
};
