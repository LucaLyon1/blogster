import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const jobOffers = await prisma.jobOffer.findMany({
            where: { userId: id },
        });

        return NextResponse.json(jobOffers, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching job offers' }, { status: 500 });
    }
}
