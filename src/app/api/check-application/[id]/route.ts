import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const jobOfferId = searchParams.get('jobOfferId');
    const userId = searchParams.get('userId');

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

        return NextResponse.json({ applied: !!testResult }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error checking application status' }, { status: 500 });
    }
}
