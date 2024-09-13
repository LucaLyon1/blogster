import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const templates = await prisma.testTemplate.findMany({
            include: { questions: true },
        });
        return NextResponse.json(templates, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching test templates' }, { status: 500 });
    }
}