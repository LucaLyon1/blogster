import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const testResults = await prisma.testResult.findMany({
            where: { jobOfferId: id },
        });

        if (testResults.length === 0) {
            return NextResponse.json({ error: 'No test results found' }, { status: 404 });
        }

        const scores = testResults.map(result => (result.correctAnswers / result.totalQuestions) * 100);
        const times = testResults.map(result => result.timeUsed);

        const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        const averageTimeUsed = times.reduce((a, b) => a + b, 0) / times.length;

        const scoreDistribution = calculateDistribution(scores, 10);
        const timeDistribution = calculateDistribution(times, 10);

        const deciles = calculateDeciles(scores);

        return NextResponse.json({
            averageScore,
            averageTimeUsed,
            scoreDistribution,
            timeDistribution,
            deciles,
            totalApplicants: testResults.length,
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching test summary:', error);
        return NextResponse.json({ error: 'Error fetching test summary' }, { status: 500 });
    }
}

function calculateDistribution(data: number[], bins: number) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    const binSize = range / bins;

    const distribution: { [key: string]: number } = {};
    for (let i = 0; i < bins; i++) {
        const binStart = min + i * binSize;
        const binEnd = binStart + binSize;
        const binLabel = `${binStart.toFixed(0)}-${binEnd.toFixed(0)}`;
        distribution[binLabel] = 0;
    }

    data.forEach(value => {
        const binIndex = Math.min(Math.floor((value - min) / binSize), bins - 1);
        const binStart = min + binIndex * binSize;
        const binEnd = binStart + binSize;
        const binLabel = `${binStart.toFixed(0)}-${binEnd.toFixed(0)}`;
        distribution[binLabel]++;
    });

    return distribution;
}

function calculateDeciles(data: number[]) {
    const sorted = [...data].sort((a, b) => a - b);
    const deciles = [];
    for (let i = 1; i < 10; i++) {
        const index = Math.floor((i / 10) * sorted.length);
        deciles.push(sorted[index]);
    }
    return deciles;
}
