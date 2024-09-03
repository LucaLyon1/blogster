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
    salaryRange: string;
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

    return (
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Job Offers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobOffers.length > 0 && jobOffers.map((job) => (
                    <div key={job.id} className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.jobTitle}</h2>
                        <p className="text-gray-600 mb-4">{job.company}</p>
                        <p className="text-gray-600 mb-4">{job.location}</p>
                        <p className="text-gray-600 mb-4">{job.salaryRange}</p>
                        <button
                            onClick={() => handleViewDashboard(job.id)}
                            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
                        >
                            View Dashboard
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
