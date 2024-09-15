import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const keywordSearch = searchParams.get('keywordSearch') || '';
    const locationSearch = searchParams.get('locationSearch') || '';
    const jobType = searchParams.get('jobType') || '';
    const workLocation = searchParams.get('workLocation') || '';
    const salaryMin = parseInt(searchParams.get('salaryMin') || '0');
    const salaryMax = parseInt(searchParams.get('salaryMax') || '0');
    const skip = (page - 1) * limit;

    try {
        const where: Prisma.JobOfferWhereInput = {
            published: true,
            ...(keywordSearch && {
                OR: [
                    { jobTitle: { contains: keywordSearch, mode: 'insensitive' } },
                    { company: { contains: keywordSearch, mode: 'insensitive' } },
                    { jobDescription: { contains: keywordSearch, mode: 'insensitive' } },
                ],
            }),
            ...(locationSearch && { location: { contains: locationSearch, mode: 'insensitive' } }),
            ...(jobType && { jobType }),
            ...(workLocation && { workLocation }),
            ...(salaryMin > 0 && { salaryLower: { gte: salaryMin } }),
            ...(salaryMax > 0 && { salaryUpper: { lte: salaryMax } }),
        };

        const [jobOffers, totalCount] = await Promise.all([
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
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching job offers' }, { status: 500 });
    }
}
