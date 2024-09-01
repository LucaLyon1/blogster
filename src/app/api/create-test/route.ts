import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    const { title, jobOfferId, questions } = await req.json();

    try {
        const newTest = await prisma.test.create({
            data: {
                title,
                jobOfferId,
                questions: {
                    create: questions.map((q) => ({
                        description: q.description,
                        answer1: q.answer1,
                        answer2: q.answer2,
                        answer3: q.answer3,
                        answer4: q.answer4,
                        correctAnswer: q.correctAnswer,
                    })),
                },
            },
        });
        return NextResponse.json(newTest, { status: 201 });
    } catch (error) {
        console.log(error);
        console.log('_______________________');
        console.log(jobOfferId);
        return NextResponse.json({ error: 'Error creating test' }, { status: 500 });
    }
}
