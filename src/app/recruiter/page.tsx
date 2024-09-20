'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaSearch, FaSort } from 'react-icons/fa';

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
    createdAt: string;
}

export default function RecruiterOffers() {
    const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
    const [filteredOffers, setFilteredOffers] = useState<JobOffer[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        const fetchJobOffers = async () => {
            try {
                const response = await fetch(`/api/recruiter/job-offers/${session?.user?.id}`);
                const data = await response.json();
                setJobOffers(data);
                setFilteredOffers(data);
            } catch (error) {
                console.error('Error fetching job offers:', error);
            }
        };
        if (session?.user?.id) {
            fetchJobOffers();
        }
    }, [session]);

    useEffect(() => {
        const filtered = jobOffers.filter(job =>
            job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const sorted = [...filtered].sort((a, b) => {
            return sortOrder === 'asc'
                ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setFilteredOffers(sorted);
    }, [jobOffers, searchTerm, sortOrder]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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
            <h1 className="text-4xl font-bold text-gray-800 mb-8">My Job Offers</h1>
            <div className="mb-6 flex items-center">
                <div className="relative flex-grow mr-4">
                    <input
                        type="text"
                        placeholder="Search job offers..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                <button
                    onClick={toggleSortOrder}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    <FaSort className="mr-2" />
                    {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
                </button>
            </div>
            <div className="space-y-6">
                {jobOffers && jobOffers.map((offer) => (
                    <div key={offer.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-2 border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{offer.jobTitle}</h2>
                                <p className="text-lg text-blue-600 mb-2">{offer.company}</p>
                                <p className="text-gray-600 mb-2">{offer.location}</p>
                            </div>
                            <span className="text-sm text-gray-500">
                                Posted: {formatDate(offer.createdAt)}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4">{offer.jobDescription.substring(0, 150)}...</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded ${getJobTypeColor(offer.jobType)}`}>
                                {offer.jobType}
                            </span>
                            <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded ${getWorkLocationColor(offer.workLocation)}`}>
                                {offer.workLocation}
                            </span>
                            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                ${offer.salaryLower.toLocaleString()} - ${offer.salaryUpper.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Link
                                href={`/recruiter/dashboard?jobOfferId=${offer.id}`}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                            >
                                View Detailed Dashboard
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
