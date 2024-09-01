import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const jobOfferId = searchParams.get('jobOfferId');

    try {
        const test = await prisma.test.findFirst({
            where: { jobOfferId: jobOfferId || '' },
            include: { questions: true },
        });

        if (!test) {
            return NextResponse.json({ error: 'Test not found' }, { status: 404 });
        }

        return NextResponse.json(test, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching test' }, { status: 500 });
    }
}
