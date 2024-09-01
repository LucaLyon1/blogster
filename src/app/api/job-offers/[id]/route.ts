import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const jobOffer = await prisma.jobOffer.findUnique({
            where: { id },
        });

        if (!jobOffer) {
            return NextResponse.json({ error: 'Job offer not found' }, { status: 404 });
        }

        return NextResponse.json(jobOffer, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching job offer' }, { status: 500 });
    }
}
