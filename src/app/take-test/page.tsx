'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface Question {
    id: string;
    description: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
}

interface Test {
    title: string;
    questions: Question[];
}

interface Grade {
    correctAnswers: number;
    totalQuestions: number;
}

export default function TakeTest() {
    const [test, setTest] = useState<Test | null>(null);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [grade, setGrade] = useState<Grade | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const jobOfferId = searchParams.get("jobOfferId");
    const { data: session } = useSession();

    useEffect(() => {
        // Fetch test details from the API
        const fetchTest = async () => {
            try {
                const response = await fetch(`/api/tests?jobOfferId=${jobOfferId}`);
                if (response.ok) {
                    const data = await response.json();
                    setTest(data);
                } else {
                    console.error('Failed to fetch test');
                }
            } catch (error) {
                console.error('Error fetching test:', error);
            }
        };

        if (jobOfferId) {
            fetchTest();
        }
    }, [jobOfferId]);

    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/submit-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jobOfferId, answers, userId: session?.userId }),
            });

            if (response.ok) {
                const result = await response.json();
                setGrade(result);
            } else {
                console.error('Failed to submit test');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!test) {
        return <div>Loading...</div>;
    }

    if (grade) {
        return (
            <div className="container mx-auto px-6 py-20">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Test Completed</h1>
                <div className="bg-white p-6 rounded shadow-md text-center">
                    <p className="text-gray-600 mb-4">You answered {grade.correctAnswers} out of {grade.totalQuestions} questions correctly.</p>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Go to Job Board
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">{test.title}</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
                {test.questions.map((question) => (
                    <div key={question.id} className="mb-4">
                        <p className="text-gray-700 mb-2">{question.description}</p>
                        {["answer1", "answer2", "answer3", "answer4"].map((answer, index) => (
                            <div key={index} className="mb-2">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        value={index + 1}
                                        onChange={() => handleAnswerChange(question.id, (index + 1).toString())}
                                        className="form-radio"
                                    />
                                    <span className="ml-2">{question[`answer${index + 1}` as keyof Question]}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Submit Test
                    </button>
                </div>
            </form>
        </div>
    );
}
