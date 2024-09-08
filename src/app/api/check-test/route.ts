import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const jobOfferId = url.searchParams.get('jobOfferId');
    const userId = url.searchParams.get('userId');

    if (!jobOfferId || !userId) {
        return NextResponse.json({ error: 'Missing jobOfferId or userId' }, { status: 400 });
    }

    try {
        const testResult = await prisma.testResult.findFirst({
            where: {
                jobOfferId,
                userId,
            },
        });

        return NextResponse.json({ taken: !!testResult }, { status: 200 });
    } catch (error) {
        console.error('Error checking if test was taken:', error);
        return NextResponse.json({ error: 'Error checking if test was taken' }, { status: 500 });
    }
}
