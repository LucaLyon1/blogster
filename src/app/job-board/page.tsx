'use client'

import { useState, useEffect } from "react";
import Link from 'next/link';
import { JobFilter } from '@/components/JobFilter';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

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

export default function JobBoard() {
    const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<JobOffer[]>([]);
    const [keywordSearch, setKeywordSearch] = useState('');
    const [locationSearch, setLocationSearch] = useState('');
    const [applicationStatus, setApplicationStatus] = useState<{ [key: string]: boolean }>({});
    const { data: session } = useSession();

    useEffect(() => {
        const fetchJobOffers = async () => {
            try {
                const response = await fetch('/api/job-offers');
                const data = await response.json();
                setJobOffers(data);
                setFilteredJobs(data);
                if (session?.user?.id) {
                    const statuses = await Promise.all(data.map(async (job: JobOffer) => {
                        const res = await fetch(`/api/check-test?jobOfferId=${job.id}&userId=${session?.user?.id}`);
                        const { taken } = await res.json();
                        return [job.id, taken];
                    }));
                    setApplicationStatus(Object.fromEntries(statuses));
                }
            } catch (error) {
                console.error('Error fetching job offers:', error);
            }
        };

        fetchJobOffers();
    }, [session]);

    const handleFilter = (filters: any) => {
        let filtered = jobOffers;

        if (filters.jobType) {
            filtered = filtered.filter(job => job.jobType === filters.jobType);
        }
        if (filters.workLocation) {
            filtered = filtered.filter(job => job.workLocation === filters.workLocation);
        }
        if (filters.salaryMin) {
            filtered = filtered.filter(job => job.salaryLower >= filters.salaryMin);
        }
        if (filters.salaryMax) {
            filtered = filtered.filter(job => job.salaryUpper <= filters.salaryMax);
        }

        setFilteredJobs(filtered);
    };

    const handleSearch = () => {
        let filtered = jobOffers;

        if (keywordSearch) {
            const keywordLower = keywordSearch.toLowerCase();
            filtered = filtered.filter(job =>
                job.jobTitle.toLowerCase().includes(keywordLower) ||
                job.company.toLowerCase().includes(keywordLower) ||
                job.jobDescription.toLowerCase().includes(keywordLower)
            );
        }

        if (locationSearch) {
            const locationLower = locationSearch.toLowerCase();
            filtered = filtered.filter(job =>
                job.location.toLowerCase().includes(locationLower)
            );
        }

        setFilteredJobs(filtered);
    };

    const getJobTypeColor = (jobType: string) => {
        switch (jobType.toLowerCase()) {
            case 'full-time':
                return 'bg-green-100 text-green-800';
            case 'part-time':
                return 'bg-blue-100 text-blue-800';
            case 'internship':
                return 'bg-yellow-100 text-yellow-800';
            case 'freelance':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getWorkLocationColor = (workLocation: string) => {
        switch (workLocation.toLowerCase()) {
            case 'remote':
                return 'bg-purple-100 text-purple-800';
            case 'on-site':
                return 'bg-red-100 text-red-800';
            case 'hybrid':
                return 'bg-indigo-100 text-indigo-800';
            default:
                return 'bg-gray-100 text-gray-800';
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
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Job Board</h1>
            <div className="flex mb-6">
                <div className="flex-1 mr-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search keywords..."
                            value={keywordSearch}
                            onChange={(e) => setKeywordSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>
                <div className="flex-1 ml-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search locations..."
                            value={locationSearch}
                            onChange={(e) => setLocationSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        />
                        <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>
                <button
                    onClick={handleSearch}
                    className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Search
                </button>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 mb-4 md:mb-0">
                    <JobFilter onFilter={handleFilter} />
                </div>
                <div className="w-full md:w-3/4 md:pl-8">
                    {filteredJobs.map((job) => (
                        <Link key={job.id} href={`/job-board/${job.id}`}>
                            <div className="bg-white p-6 rounded-lg shadow-md mb-4 hover:shadow-lg hover:border-blue-500 hover:border-2 hover:scale-105 transition-all duration-200 ease-in-out">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">{job.jobTitle}</h2>
                                        <p className="text-lg text-blue-600">{job.company}</p>
                                    </div>
                                    <span className="text-gray-500 text-sm">
                                        Posted: {formatDate(job.createdAt)}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                        {job.location}
                                    </span>
                                    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded ${getWorkLocationColor(job.workLocation)}`}>
                                        {job.workLocation}
                                    </span>
                                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                        ${job.salaryLower.toLocaleString()} - ${job.salaryUpper.toLocaleString()}
                                    </span>
                                    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded ${getJobTypeColor(job.jobType)}`}>
                                        {job.jobType}
                                    </span>
                                </div>
                                <p className="text-gray-700 text-sm mb-4">{job.jobDescription.substring(0, 100)}...</p>
                                <div className="flex justify-end">
                                    <button
                                        className={`py-1 px-3 rounded-md text-white font-semibold text-sm transition-all duration-200 ${applicationStatus[job.id]
                                            ? 'bg-gray-500 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600 hover:shadow-md'
                                            }`}
                                        disabled={applicationStatus[job.id]}
                                    >
                                        {applicationStatus[job.id] ? 'Already Applied' : 'Apply Now'}
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
