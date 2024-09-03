import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const profile = await prisma.user.findUnique({
            where: { id },
            select: {
                description: true,
                currentJobTitle: true,
                jobHistory: true,
                email: true,
                phoneNumber: true,
            },
        });

        if (!profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching profile' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const { description, currentJobTitle, jobHistory, email, phoneNumber } = await req.json();

    try {
        const updatedProfile = await prisma.user.update({
            where: { id },
            data: {
                description,
                currentJobTitle,
                jobHistory: jobHistory ? JSON.stringify(jobHistory) : null,
                email,
                phoneNumber,
            },
        });

        return NextResponse.json(updatedProfile, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating profile' }, { status: 500 });
    }
}