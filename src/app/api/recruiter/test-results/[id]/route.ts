import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const sortBy = searchParams.get('sortBy') || 'score';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const minScore = searchParams.get('minScore') ? parseInt(searchParams.get('minScore')!) : undefined;
    const maxScore = searchParams.get('maxScore') ? parseInt(searchParams.get('maxScore')!) : undefined;
    const minAppliedDate = searchParams.get('minAppliedDate') || undefined;
    const maxAppliedDate = searchParams.get('maxAppliedDate') || undefined;
    const minTimeUsed = searchParams.get('minTimeUsed') ? parseInt(searchParams.get('minTimeUsed')!) : undefined;
    const maxTimeUsed = searchParams.get('maxTimeUsed') ? parseInt(searchParams.get('maxTimeUsed')!) : undefined;

    try {
        const testResults = await prisma.testResult.findMany({
            where: {
                jobOfferId: id,
                ...(minScore !== undefined && { score: { gte: minScore } }),
                ...(maxScore !== undefined && { score: { lte: maxScore } }),
                ...(minAppliedDate !== undefined && { appliedAt: { gte: new Date(minAppliedDate) } }),
                ...(maxAppliedDate !== undefined && { appliedAt: { lte: new Date(maxAppliedDate) } }),
                ...(minTimeUsed !== undefined && { timeUsed: { gte: minTimeUsed } }),
                ...(maxTimeUsed !== undefined && { timeUsed: { lte: maxTimeUsed } }),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: [
                {
                    [sortBy === 'score' ? 'correctAnswers' : sortBy]: sortOrder,
                },
                { id: 'asc' },
            ],
        });

        const resultsWithScore = testResults.map(result => ({
            ...result,
            score: (result.correctAnswers / result.totalQuestions) * 100,
        }));

        return NextResponse.json(resultsWithScore, { status: 200 });
    } catch (error) {
        console.error('Error fetching test results:', error);
        return NextResponse.json({ error: 'Error fetching test results' }, { status: 500 });
    }
}
