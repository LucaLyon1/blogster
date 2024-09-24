'use client'

import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { FaArrowLeft } from "react-icons/fa";
import router from "next/router";
import BackButton from "@/components/BackButton";

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
    compensationType: string;
}

export default function JobDetails() {
    const [jobOffer, setJobOffer] = useState<JobOffer | null>(null);
    const [isApplied, setIsApplied] = useState(false);
    const { id } = useParams();
    const { data: session } = useSession();
    const pathname = usePathname();

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
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <BackButton />
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{jobOffer.jobTitle}</h1>
                <p className="text-2xl text-blue-600 mb-4">{jobOffer.company}</p>
                <hr className="my-6 border-t border-gray-200" />

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                            Location
                        </span>
                        <p className="text-gray-700 mt-1">{jobOffer.location}</p>
                    </div>
                    <div>
                        <span className="inline-block bg-purple-100 text-purple-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                            Work Type
                        </span>
                        <p className="text-gray-700 mt-1">{jobOffer.workLocation}</p>
                    </div>
                    <div>
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                            Salary Range
                        </span>
                        <p className="text-gray-700 mt-1">
                            ${jobOffer.salaryLower.toLocaleString()} - ${jobOffer.salaryUpper.toLocaleString()} ({jobOffer.compensationType})
                        </p>
                    </div>
                    <div>
                        <span className="inline-block bg-red-100 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                            Job Type
                        </span>
                        <p className="text-gray-700 mt-1">{jobOffer.jobType}</p>
                    </div>
                </div>

                <hr className="my-6 border-t border-gray-200" />

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Job Description</h2>
                    <p className="text-gray-700 whitespace-pre-line">{jobOffer.jobDescription}</p>
                </div>

                <div className="flex justify-between items-center mt-8">
                    <span className="text-gray-500 text-sm">
                        Posted on: {new Date(jobOffer.createdAt).toLocaleDateString()}
                    </span>
                    {session?.user ? (
                        isApplied ? (
                            <button
                                className="py-3 px-6 rounded-md text-white font-semibold text-lg bg-gray-500 cursor-not-allowed"
                                disabled
                            >
                                Already Applied
                            </button>
                        ) : (
                            <Link
                                href={`/take-test?jobOfferId=${jobOffer.id}`}
                                className="py-3 px-6 rounded-md text-white font-semibold text-lg transition-all duration-200 bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
                            >
                                Apply Now
                            </Link>
                        )
                    ) : (
                        <Link
                            href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
                            className="py-3 px-6 bg-white text-blue-500 border-2 border-blue-500 rounded-md hover:bg-blue-50 hover:shadow-lg transition-all duration-200 ease-in-out font-semibold text-lg"
                        >
                            Log in to Apply
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
