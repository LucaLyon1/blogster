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

    const user = session.user;
    const isAdmin = user?.role && hasRole({ role: user.role }, ROLES.ADMIN);
    const isPremiumOrAbove = user?.role && (hasRole({ role: user.role }, ROLES.PREMIUM) || hasRole({ role: user.role }, ROLES.ENTERPRISE) || isAdmin);

    // Check for recruiter routes
    if (request.nextUrl.pathname.startsWith('/recruiter')) {
        if (!isPremiumOrAbove) {
            return NextResponse.redirect(new URL('/upgrade', request.url));
        }

        // Check if the user is the creator of the offer or an admin
        const offerId = request.nextUrl.searchParams.get('jobOfferId');
        if (offerId && !isAdmin) {
            try {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/job-offers/${offerId}`, {
                    headers: {
                        'Cookie': request.headers.get('cookie') || '',
                    },
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch job offer');
                }
                const offer = await res.json();
                if (offer && offer.userId !== user.id) {
                    return NextResponse.redirect(new URL('/', request.url));
                }
            } catch (error) {
                console.error('Error fetching job offer:', error);
                return NextResponse.redirect(new URL('/error', request.url));
            }
        }
    }

    // Check for create-offer and create-test routes
    if (request.nextUrl.pathname.startsWith('/create-offer') || request.nextUrl.pathname.startsWith('/create-test')) {
        if (!isPremiumOrAbove) {
            return NextResponse.redirect(new URL('/upgrade', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/recruiter/:path*',
        '/create-offer/:path*',
        '/create-test/:path*',
        '/take-test/:path*',
    ],
};
