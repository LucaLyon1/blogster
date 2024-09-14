'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { FaBuilding, FaMapMarkerAlt, FaDollarSign, FaBriefcase, FaLaptopHouse } from 'react-icons/fa';
import BackButton from '@/components/BackButton';

export default function CreateOffer() {
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [salaryLower, setSalaryLower] = useState<number>(0);
    const [salaryUpper, setSalaryUpper] = useState<number>(0);
    const [jobType, setJobType] = useState<string>("");
    const [workLocation, setWorkLocation] = useState<string>("");

    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn(undefined, { callbackUrl: window.location.pathname + window.location.search });
        }
    }, [status]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/create-offer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobTitle,
                    jobDescription,
                    company,
                    location,
                    salaryLower,
                    salaryUpper,
                    jobType,
                    workLocation,
                    userId: session?.user?.id,
                }),
            });

            if (response.ok) {
                const jobOffer = await response.json();
                router.push(`/create-test?jobOfferId=${jobOffer.id}`);
            } else {
                console.error('Failed to create job offer');
            }
        } catch (error) {
            console.error('Error creating job offer:', error);
        }
    };

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div>
                <style jsx>{`
                    .loader {
                        border: 8px solid #f3f3f3;
                        border-top: 8px solid #3498db;
                        border-radius: 50%;
                        width: 60px;
                        height: 60px;
                        animation: spin 2s linear infinite;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <nav className="bg-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <BackButton />
                    <span className="text-gray-500 font-semibold">Draft</span>
                </div>
            </nav>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">Create a Job Offer</h1>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-700">Basic Information</h2>
                            <hr className="border-gray-300" />
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobTitle">
                                    Job Title
                                </label>
                                <input
                                    id="jobTitle"
                                    type="text"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobDescription">
                                    Job Description
                                </label>
                                <textarea
                                    id="jobDescription"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows={4}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-700">Company Details</h2>
                            <hr className="border-gray-300" />
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                                        <FaBuilding className="inline-block mr-2" />Company
                                    </label>
                                    <input
                                        id="company"
                                        type="text"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                                        <FaMapMarkerAlt className="inline-block mr-2" />Location
                                    </label>
                                    <input
                                        id="location"
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-700">Compensation</h2>
                            <hr className="border-gray-300" />
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salaryLower">
                                        <FaDollarSign className="inline-block mr-2" />Salary Range (Lower)
                                    </label>
                                    <input
                                        id="salaryLower"
                                        type="number"
                                        value={salaryLower}
                                        onChange={(e) => setSalaryLower(Number(e.target.value))}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salaryUpper">
                                        <FaDollarSign className="inline-block mr-2" />Salary Range (Upper)
                                    </label>
                                    <input
                                        id="salaryUpper"
                                        type="number"
                                        value={salaryUpper}
                                        onChange={(e) => setSalaryUpper(Number(e.target.value))}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-700">Job Details</h2>
                            <hr className="border-gray-300" />
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobType">
                                        <FaBriefcase className="inline-block mr-2" />Job Type
                                    </label>
                                    <select
                                        id="jobType"
                                        value={jobType}
                                        onChange={(e) => setJobType(e.target.value)}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Job Type</option>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workLocation">
                                        <FaLaptopHouse className="inline-block mr-2" />Work Location
                                    </label>
                                    <select
                                        id="workLocation"
                                        value={workLocation}
                                        onChange={(e) => setWorkLocation(e.target.value)}
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select Work Location</option>
                                        <option value="On-site">On-site</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Create Test
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
