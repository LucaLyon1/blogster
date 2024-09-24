import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const keyword = searchParams.get('keyword') || '';
    const location = searchParams.get('location') || '';
    const jobType = searchParams.get('jobType') || '';
    const workLocation = searchParams.get('workLocation') || '';
    const salaryMin = parseInt(searchParams.get('salaryMin') || '0');
    const salaryMax = parseInt(searchParams.get('salaryMax') || '1000000');
    const compensationType = searchParams.get('compensationType') || '';

    const skip = (page - 1) * limit;

    const where: any = {
        published: true,
        jobTitle: { contains: keyword, mode: 'insensitive' },
        location: { contains: location, mode: 'insensitive' },

    };

    if (jobType) where.jobType = jobType;
    if (workLocation) where.workLocation = workLocation;
    if (compensationType) where.compensationType = compensationType;
    if (salaryMin) where.salaryLower = { gte: salaryMin };
    if (salaryMax) where.salaryUpper = { lte: salaryMax };
    try {
        const [jobOffers, totalCount] = await prisma.$transaction([
            prisma.jobOffer.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.jobOffer.count({ where }),
        ]);
        return NextResponse.json({
            jobOffers,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error('Error fetching job offers:', error);
        return NextResponse.json({ error: 'Error fetching job offers' }, { status: 500 });
    }
}
