'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface User {
    id: string;
    name: string;
}

interface TestResult {
    id: string;
    user: User;
    correctAnswers: number;
    totalQuestions: number;
    score: number;
    appliedAt: string;
    timeUsed: number;
}

export default function RecruiterDashboard() {
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const [sortBy, setSortBy] = useState<string>('score');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [minScore, setMinScore] = useState<number | undefined>(undefined);
    const [maxScore, setMaxScore] = useState<number | undefined>(undefined);
    const [minAppliedDate, setMinAppliedDate] = useState<string | undefined>(undefined);
    const [maxAppliedDate, setMaxAppliedDate] = useState<string | undefined>(undefined);
    const [minTimeUsed, setMinTimeUsed] = useState<number | undefined>(undefined);
    const [maxTimeUsed, setMaxTimeUsed] = useState<number | undefined>(undefined);
    const router = useRouter();
    const searchParams = useSearchParams();
    const jobOfferId = searchParams.get("jobOfferId");

    useEffect(() => {
        fetchTestResults();
    }, [jobOfferId, sortBy, sortOrder, minScore, maxScore, minAppliedDate, maxAppliedDate, minTimeUsed, maxTimeUsed]);

    const fetchTestResults = async () => {
        if (!jobOfferId) return;

        const queryParams = new URLSearchParams({
            sortBy,
            sortOrder,
            ...(minScore !== undefined && { minScore: minScore.toString() }),
            ...(maxScore !== undefined && { maxScore: maxScore.toString() }),
            ...(minAppliedDate !== undefined && { minAppliedDate }),
            ...(maxAppliedDate !== undefined && { maxAppliedDate }),
            ...(minTimeUsed !== undefined && { minTimeUsed: minTimeUsed.toString() }),
            ...(maxTimeUsed !== undefined && { maxTimeUsed: maxTimeUsed.toString() }),
        });

        try {
            const response = await fetch(`/api/recruiter/test-results/${jobOfferId}?${queryParams}`);
            if (!response.ok) {
                throw new Error('Failed to fetch test results');
            }
            const data: TestResult[] = await response.json();
            setTestResults(data);
        } catch (error) {
            console.error('Error fetching test results:', error);
        }
    };

    const handleSort = (field: string) => {
        if (field === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'bg-green-100';
        if (score >= 70) return 'bg-yellow-100';
        if (score >= 50) return 'bg-orange-100';
        return 'bg-red-100';
    };

    return (
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Candidates' Scores</h1>
            <div className="mb-4 flex flex-wrap justify-between items-center">
                <div>
                    <label className="mr-2">Min Score:</label>
                    <input
                        type="number"
                        value={minScore || ''}
                        onChange={(e) => setMinScore(e.target.value ? parseInt(e.target.value) : undefined)}
                        className="border rounded px-2 py-1 w-20"
                    />
                    <label className="mx-2">Max Score:</label>
                    <input
                        type="number"
                        value={maxScore || ''}
                        onChange={(e) => setMaxScore(e.target.value ? parseInt(e.target.value) : undefined)}
                        className="border rounded px-2 py-1 w-20"
                    />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 mb-4">
                    <label className="block text-sm font-medium text-gray-700">Applied Date Range</label>
                    <input
                        type="date"
                        value={minAppliedDate || ''}
                        onChange={(e) => setMinAppliedDate(e.target.value || undefined)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    <input
                        type="date"
                        value={maxAppliedDate || ''}
                        onChange={(e) => setMaxAppliedDate(e.target.value || undefined)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 mb-4">
                    <label className="block text-sm font-medium text-gray-700">Time Used Range (seconds)</label>
                    <input
                        type="number"
                        value={minTimeUsed || ''}
                        onChange={(e) => setMinTimeUsed(e.target.value ? parseInt(e.target.value) : undefined)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        placeholder="Min time"
                    />
                    <input
                        type="number"
                        value={maxTimeUsed || ''}
                        onChange={(e) => setMaxTimeUsed(e.target.value ? parseInt(e.target.value) : undefined)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        placeholder="Max time"
                    />
                </div>
                <button
                    onClick={fetchTestResults}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Apply Filters
                </button>
            </div>
            <div className="bg-white p-6 rounded shadow-md">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 border-b cursor-pointer" onClick={() => handleSort('user.name')}>
                                Candidate {sortBy === 'user.name' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="py-2 border-b cursor-pointer" onClick={() => handleSort('correctAnswers')}>
                                Correct Answers {sortBy === 'correctAnswers' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="py-2 border-b">Total Questions</th>
                            <th className="py-2 border-b cursor-pointer" onClick={() => handleSort('score')}>
                                Score {sortBy === 'score' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="py-2 border-b cursor-pointer" onClick={() => handleSort('appliedAt')}>
                                Applied At {sortBy === 'appliedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="py-2 border-b cursor-pointer" onClick={() => handleSort('timeUsed')}>
                                Time Used (seconds) {sortBy === 'timeUsed' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {testResults.map((result) => {
                            const score = (result.correctAnswers / result.totalQuestions) * 100;
                            return (
                                <tr key={result.id} className="hover:bg-gray-100 transition duration-300">
                                    <td className="py-2 border-b text-center">
                                        <Link href={`/profile/${result.user.id}`} className="text-blue-600 hover:underline">
                                            {result.user.name}
                                        </Link>
                                    </td>
                                    <td className="py-2 border-b text-center">{result.correctAnswers}</td>
                                    <td className="py-2 border-b text-center">{result.totalQuestions}</td>
                                    <td className="py-2 border-b text-center">
                                        <div className={`inline-block px-2 py-1 rounded w-20 text-center ${getScoreColor(score)}`}>
                                            {score.toFixed(2)}%
                                        </div>
                                    </td>
                                    <td className="py-2 border-b text-center">{new Date(result.appliedAt).toLocaleString()}</td>
                                    <td className="py-2 border-b text-center">{result.timeUsed}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
