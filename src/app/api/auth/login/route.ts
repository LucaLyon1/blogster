import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return NextResponse.json({ message: 'Login successful', token }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Error logging in', error: (error as Error).message }, { status: 400 });
    }
}