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
}

export default function RecruiterDashboard() {
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const jobOfferId = searchParams.get("jobOfferId");

    useEffect(() => {
        // Fetch test results for the job offer
        const fetchTestResults = async () => {
            try {
                const response = await fetch(`/api/recruiter/test-results/${jobOfferId}`);
                const data: TestResult[] = await response.json();
                setTestResults(data);
            } catch (error) {
                console.error('Error fetching test results:', error);
            }
        };

        if (jobOfferId) {
            fetchTestResults();
        }
    }, [jobOfferId]);

    return (
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Candidates' Scores</h1>
            <div className="bg-white p-6 rounded shadow-md">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 border-b">Candidate</th>
                            <th className="py-2 border-b">Correct Answers</th>
                            <th className="py-2 border-b">Total Questions</th>
                            <th className="py-2 border-b">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testResults.map((result) => (
                            <tr key={result.id} className="hover:bg-gray-100 transition duration-300">
                                <td className="py-2 border-b text-center">
                                    <Link href={`/profile/${result.user.id}`} className="text-blue-600 hover:underline">
                                        {result.user.name}
                                    </Link>
                                </td>
                                <td className="py-2 border-b text-center">{result.correctAnswers}</td>
                                <td className="py-2 border-b text-center">{result.totalQuestions}</td>
                                <td className="py-2 border-b text-center">{((result.correctAnswers / result.totalQuestions) * 100).toFixed(2)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
