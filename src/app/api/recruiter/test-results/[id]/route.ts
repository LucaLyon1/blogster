import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    console.log(id)
    try {
        const testResults = await prisma.testResult.findMany({
            where: { jobOfferId: id },
            include: { user: true },
        });

        return NextResponse.json(testResults, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching test results' }, { status: 500 });
    }
}
