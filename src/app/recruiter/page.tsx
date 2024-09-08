'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { useSession } from "next-auth/react";

interface JobOffer {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    salaryLower: number;
    salaryUpper: number;
    jobType: string;
    workLocation: string;
    jobDescription: string;
    createdAt: Date;
}

export default function RecruiterOffers() {
    const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        // Fetch job offers created by the recruiter
        const fetchJobOffers = async () => {
            try {
                const response = await fetch(`/api/recruiter/job-offers/${session?.user?.id}`);
                const data = await response.json();
                setJobOffers(data);
            } catch (error) {
                console.error('Error fetching job offers:', error);
            }
        };
        fetchJobOffers();
    }, [session]);

    const handleViewDashboard = (jobOfferId: string) => {
        router.push(`/recruiter/dashboard?jobOfferId=${jobOfferId}`);
    };

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

    return (
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Job Offers</h1>
            <div className="space-y-6">
                {jobOffers.map((job) => (
                    <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:border-blue-500 border-2 hover:scale-105">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.jobTitle}</h2>
                                <p className="text-gray-600 mb-2">{job.company}</p>
                                <p className="text-gray-600 mb-2">{job.location}</p>
                                <p className="text-gray-500 mb-2 text-sm">{job.jobDescription.substring(0, 150)}...</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getJobTypeColor(job.jobType)} mb-2`}>
                                    {job.jobType}
                                </span>
                                <span className="text-lg font-bold text-gray-800 mb-2">
                                    ${job.salaryLower.toLocaleString()} - ${job.salaryUpper.toLocaleString()}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getWorkLocationColor(job.workLocation)} mb-2`}>
                                    {job.workLocation}
                                </span>
                                <button
                                    onClick={() => handleViewDashboard(job.id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                                >
                                    View Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
