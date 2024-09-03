'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from 'next/link';

interface JobOffer {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    salaryLower: number;
    salaryUpper: number;
    jobType: string;
    workLocation: string;
    createdAt: string;
    jobDescription: string;
}

export default function JobDetails() {
    const [jobOffer, setJobOffer] = useState<JobOffer | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchJobOffer = async () => {
            try {
                const response = await fetch(`/api/job-offers/${id}`);
                if (response.ok) {
                    const data: JobOffer = await response.json();
                    setJobOffer(data);
                } else {
                    console.error('Failed to fetch job offer');
                }
            } catch (error) {
                console.error('Error fetching job offer:', error);
            }
        };

        if (id) {
            fetchJobOffer();
        }
    }, [id]);

    if (!jobOffer) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    const getJobTypeColor = (jobType: string) => {
        switch (jobType.toLowerCase()) {
            case 'full-time':
                return 'bg-green-500 text-white';
            case 'part-time':
                return 'bg-blue-500 text-white';
            case 'internship':
                return 'bg-yellow-500 text-white';
            case 'freelance':
                return 'bg-orange-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const getWorkLocationColor = (workLocation: string) => {
        switch (workLocation.toLowerCase()) {
            case 'remote':
                return 'bg-cyan-500 text-white';
            case 'on-site':
                return 'bg-red-500 text-white';
            case 'hybrid':
                return 'bg-purple-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays}d ago`;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{jobOffer.jobTitle}</h1>
                    <div className="flex flex-wrap items-center mb-4">
                        <span className="text-gray-600 mr-4">{jobOffer.company}</span>
                        <span className="text-gray-600 mr-4">{jobOffer.location}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getJobTypeColor(jobOffer.jobType)} mr-2`}>
                            {jobOffer.jobType}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getWorkLocationColor(jobOffer.workLocation)} mr-2`}>
                            {jobOffer.workLocation}
                        </span>
                        <span className="text-gray-400 text-sm">{formatDate(jobOffer.createdAt)}</span>
                    </div>
                    <div className="mb-6">
                        <span className="text-2xl font-bold text-gray-800">${jobOffer.salaryLower.toLocaleString()} - ${jobOffer.salaryUpper.toLocaleString()}</span>
                        <span className="text-gray-600 ml-2">per year</span>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Job Description</h2>
                        <p className="text-gray-600 whitespace-pre-line">{jobOffer.jobDescription}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <Link href="/job-board" className="text-blue-500 hover:underline">
                            Back to Job Board
                        </Link>
                        <Link href={`/take-test?jobOfferId=${jobOffer.id}`}>
                            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                                Apply Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
