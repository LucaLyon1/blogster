import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    const { jobTitle, jobDescription, company, location, salaryLower, salaryUpper, jobType, workLocation, userId } = await req.json();
    try {
        const newJobOffer = await prisma.jobOffer.create({
            data: {
                jobTitle,
                jobDescription,
                company,
                location,
                salaryLower,
                salaryUpper,
                jobType,
                workLocation,
                userId
            },
        });
        return NextResponse.json(newJobOffer, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating job offer' }, { status: 500 });
    }
}
