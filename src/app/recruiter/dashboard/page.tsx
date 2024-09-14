'use client'

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FaUsers, FaClock, FaTrophy, FaChartLine } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TestResult {
    id: string;
    user: {
        id: string;
        name: string;
    };
    correctAnswers: number;
    totalQuestions: number;
    timeUsed: number;
    appliedAt: string;
}

interface TestSummary {
    averageScore: number;
    averageTimeUsed: number;
    scoreDistribution: { [key: string]: number };
    timeDistribution: { [key: string]: number };
    deciles: number[];
    totalApplicants: number;
}

function StatCard({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: string, color: string }) {
    return (
        <div className={`bg-white rounded-lg shadow-md p-6 flex items-center ${color}`}>
            <div className="mr-4 text-3xl">{icon}</div>
            <div>
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
}

function getScoreColor(score: number): string {
    if (score >= 90) return 'bg-green-500 text-white';
    if (score >= 80) return 'bg-green-400 text-white';
    if (score >= 70) return 'bg-yellow-500 text-white';
    if (score >= 60) return 'bg-yellow-400 text-white';
    return 'bg-red-500 text-white';
}

export default function RecruiterDashboard() {
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const [testSummary, setTestSummary] = useState<TestSummary | null>(null);
    const searchParams = useSearchParams();
    const jobOfferId = searchParams.get('jobOfferId');

    useEffect(() => {
        if (jobOfferId) {
            fetchTestResults();
            fetchTestSummary();
        }
    }, [jobOfferId]);

    const fetchTestResults = async () => {
        try {
            const response = await fetch(`/api/recruiter/test-results/${jobOfferId}`);
            if (response.ok) {
                const data = await response.json();
                setTestResults(data);
            } else {
                console.error('Failed to fetch test results');
            }
        } catch (error) {
            console.error('Error fetching test results:', error);
        }
    };

    const fetchTestSummary = async () => {
        try {
            const response = await fetch(`/api/recruiter/test-summary/${jobOfferId}`);
            if (response.ok) {
                const data = await response.json();
                setTestSummary(data);
            } else {
                console.error('Failed to fetch test summary');
            }
        } catch (error) {
            console.error('Error fetching test summary:', error);
        }
    };

    const renderScoreDistributionChart = () => {
        if (!testSummary) return null;

        const data = {
            labels: Object.keys(testSummary.scoreDistribution),
            datasets: [
                {
                    label: 'Number of Applicants',
                    data: Object.values(testSummary.scoreDistribution),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: 'Score Distribution',
                },
            },
        };

        return <Bar data={data} options={options} />;
    };

    const renderTimeDistributionChart = () => {
        if (!testSummary) return null;

        const data = {
            labels: Object.keys(testSummary.timeDistribution),
            datasets: [
                {
                    label: 'Number of Applicants',
                    data: Object.values(testSummary.timeDistribution),
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: 'Time Distribution (seconds)',
                },
            },
        };

        return <Bar data={data} options={options} />;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="my-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Recruiter Dashboard</h1>
            </div>

            {testSummary && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={<FaUsers className="text-blue-500" />}
                        title="Total Applicants"
                        value={testSummary.totalApplicants.toString()}
                        color="text-blue-500"
                    />
                    <StatCard
                        icon={<FaTrophy className="text-green-500" />}
                        title="Average Score"
                        value={`${testSummary.averageScore.toFixed(2)}%`}
                        color="text-green-500"
                    />
                    <StatCard
                        icon={<FaClock className="text-yellow-500" />}
                        title="Average Time"
                        value={`${(testSummary.averageTimeUsed / 60).toFixed(2)} min`}
                        color="text-yellow-500"
                    />
                    <StatCard
                        icon={<FaChartLine className="text-purple-500" />}
                        title="Top 10% Score"
                        value={`${testSummary.deciles[8].toFixed(2)}%`}
                        color="text-purple-500"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Score Distribution</h2>
                    {renderScoreDistributionChart()}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Time Distribution</h2>
                    {renderTimeDistributionChart()}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Correct Answers</th>
                            <th className="py-3 px-4 text-left">Total Questions</th>
                            <th className="py-3 px-4 text-left">Score</th>
                            <th className="py-3 px-4 text-left">Applied At</th>
                            <th className="py-3 px-4 text-left">Time Used</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testResults.map((result, index) => {
                            const score = (result.correctAnswers / result.totalQuestions) * 100;
                            return (
                                <tr key={result.id} className={index % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white hover:bg-gray-100'}>
                                    <td className="py-3 px-4 border-b">{index + 1}</td>
                                    <td className="py-3 px-4 border-b">
                                        <Link href={`/profile/${result.user.id}`} className="text-blue-600 hover:underline">
                                            {result.user.name}
                                        </Link>
                                    </td>
                                    <td className="py-3 px-4 border-b">{result.correctAnswers}</td>
                                    <td className="py-3 px-4 border-b">{result.totalQuestions}</td>
                                    <td className="py-3 px-4 border-b">
                                        <span className={`px-2 py-1 rounded ${getScoreColor(score)}`}>
                                            {score.toFixed(2)}%
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 border-b">{new Date(result.appliedAt).toLocaleString()}</td>
                                    <td className="py-3 px-4 border-b">{(result.timeUsed / 60).toFixed(2)} min</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
