'use client'

import { useState, useEffect } from "react";
import Link from 'next/link';

interface JobOffer {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    salaryRange: string;
    jobDescription: string;
}

export default function JobBoard() {
    const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch job offers from the API
        const fetchJobOffers = async () => {
            try {
                const response = await fetch('/api/job-offers');
                const data = await response.json();
                setJobOffers(data);
            } catch (error) {
                console.error('Error fetching job offers:', error);
            }
        };

        fetchJobOffers();
    }, []);

    const filteredJobs = jobOffers.filter(job =>
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Job Board</h1>
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search for jobs..."
                    className="w-full px-4 py-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJobs.map((job) => (
                    <Link key={job.id} href={`/job-board/${job.id}`}>
                        <div className="bg-white p-6 rounded shadow-md cursor-pointer">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.jobTitle}</h2>
                            <p className="text-gray-600 mb-4">{job.company}</p>
                            <p className="text-gray-600 mb-4">{job.location}</p>
                            <p className="text-gray-600 mb-4">{job.salaryRange}</p>
                            <p className="text-gray-600">{job.jobDescription}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
