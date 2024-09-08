import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    const { jobOfferId, answers, userId } = await req.json();
    try {
        // Check if the user has already taken the test
        const existingResult = await prisma.testResult.findFirst({
            where: {
                jobOfferId,
                userId,
            },
        });

        if (existingResult) {
            return NextResponse.json({ error: 'You have already taken this test' }, { status: 400 });
        }

        const test = await prisma.test.findFirst({
            where: { jobOfferId },
            include: { questions: true },
        });

        if (!test) {
            return NextResponse.json({ error: 'Test not found' }, { status: 404 });
        }

        let correctAnswers = 0;
        const totalQuestions = test.questions.length;

        test.questions.forEach((question) => {
            if (answers[question.id] === question.correctAnswer) {
                correctAnswers += 1;
            }
        });

        // Save the result to the database
        await prisma.testResult.create({
            data: {
                jobOfferId,
                correctAnswers,
                totalQuestions,
                userId,
            },
        });

        return NextResponse.json({ correctAnswers, totalQuestions }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error submitting test' }, { status: 500 });
    }
}
