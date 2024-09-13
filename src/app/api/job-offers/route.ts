import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    try {
        const [jobOffers, totalCount] = await Promise.all([
            prisma.jobOffer.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.jobOffer.count(),
        ]);

        return NextResponse.json({
            jobOffers,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching job offers' }, { status: 500 });
    }
}
