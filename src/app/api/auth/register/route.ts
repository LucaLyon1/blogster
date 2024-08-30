import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const { email, password, name } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        return NextResponse.json({ message: 'User created successfully', userId: user.id }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating user', error: (error as Error).message }, { status: 400 });
    }
}