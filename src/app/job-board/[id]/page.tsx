'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from 'next/link';
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
    createdAt: string;
    jobDescription: string;
}

export default function JobDetails() {
    const [jobOffer, setJobOffer] = useState<JobOffer | null>(null);
    const [isApplied, setIsApplied] = useState(false);
    const { id } = useParams();
    const { data: session } = useSession();

    useEffect(() => {
        const fetchJobOffer = async () => {
            try {
                const response = await fetch(`/api/job-offers/${id}`);
                const data = await response.json();
                setJobOffer(data);

                if (session?.user?.id) {
                    const statusResponse = await fetch(`/api/check-test?jobOfferId=${id}&userId=${session.user.id}`);
                    const { taken } = await statusResponse.json();
                    setIsApplied(taken);
                }
            } catch (error) {
                console.error('Error fetching job offer:', error);
            }
        };

        fetchJobOffer();
    }, [id, session]);

    if (!jobOffer) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{jobOffer.jobTitle}</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-xl text-gray-600 mb-4">{jobOffer.company}</p>
                <p className="text-gray-600 mb-4">{jobOffer.location}</p>
                <p className="text-gray-700 mb-4">{jobOffer.jobDescription}</p>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-800">
                        ${jobOffer.salaryLower.toLocaleString()} - ${jobOffer.salaryUpper.toLocaleString()}
                    </span>
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                        {jobOffer.jobType}
                    </span>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600">{jobOffer.workLocation}</span>
                    <span className="text-gray-500 text-sm">Posted on: {new Date(jobOffer.createdAt).toLocaleDateString()}</span>
                </div>
                {session?.user ? (
                    <button
                        className={`w-full py-2 px-4 rounded-md text-white font-semibold ${isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        disabled={isApplied}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </button>
                ) : (
                    <Link href="/login" className="block w-full text-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Log in to Apply
                    </Link>
                )}
            </div>
        </div>
    );
}
