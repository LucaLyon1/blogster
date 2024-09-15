import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { ROLES, hasRole } from '@/lib/role';

export async function middleware(request: NextRequest) {
    const session = await auth();

    if (!session) {
        const callbackUrl = encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search);
        return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, request.url));
    }

    // Check for premium routes
    if (request.nextUrl.pathname.startsWith('/premium') && !hasRole(session?.user ? session.user : { role: ROLES.PREMIUM }, ROLES.PREMIUM)) {
        return NextResponse.redirect(new URL('/upgrade', request.url));
    }

    // Check for enterprise routes
    if (request.nextUrl.pathname.startsWith('/enterprise') && !hasRole(session?.user ? session.user : { role: ROLES.ENTERPRISE }, ROLES.ENTERPRISE)) {
        return NextResponse.redirect(new URL('/upgrade', request.url));
    }

    // Check for admin routes
    if (request.nextUrl.pathname.startsWith('/admin') && !hasRole(session?.user ? session.user : { role: ROLES.ADMIN }, ROLES.ADMIN)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect free users to upgrade page when trying to create a job offer
    if (request.nextUrl.pathname === '/create-offer' && hasRole(session?.user ? session.user : { role: ROLES.FREE }, ROLES.FREE)) {
        return NextResponse.redirect(new URL('/upgrade', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/create-offer/:path*',
        '/create-test/:path*',
        '/take-test',
        '/premium/:path*',
        '/enterprise/:path*',
        '/admin/:path*',
    ],
};
