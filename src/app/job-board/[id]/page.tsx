'use client'

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface JobOffer {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    salaryRange: string;
    jobDescription: string;
}

export default function JobOfferDetails() {
    const [jobOffer, setJobOffer] = useState<JobOffer | null>(null);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        // Fetch job offer details from the API
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
        return <div>Loading...</div>;
    }

    const handleTakeTest = () => {
        router.push(`/take-test?jobOfferId=${jobOffer.id}`);
    };

    return (
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">{jobOffer.jobTitle}</h1>
            <div className="bg-white p-6 rounded shadow-md">
                <p className="text-gray-600 mb-4"><strong>Company:</strong> {jobOffer.company}</p>
                <p className="text-gray-600 mb-4"><strong>Location:</strong> {jobOffer.location}</p>
                <p className="text-gray-600 mb-4"><strong>Salary Range:</strong> {jobOffer.salaryRange}</p>
                <p className="text-gray-600"><strong>Description:</strong> {jobOffer.jobDescription}</p>
                <button
                    onClick={handleTakeTest}
                    className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300 mt-4"
                >
                    Take Test
                </button>
            </div>
        </div>
    );
}
