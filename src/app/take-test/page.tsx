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
    id: string;
    title: string;
    questions: Question[];
}

interface Grade {
    correctAnswers: number;
    totalQuestions: number;
}

export default function TakeTest() {
    const [test, setTest] = useState<Test | null>(null);
    const [answers, setAnswers] = useState<{ [key: string]: number }>({});
    const [grade, setGrade] = useState<Grade | null>(null);
    const [hasAlreadyTaken, setHasAlreadyTaken] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const jobOfferId = searchParams.get("jobOfferId");
    const { data: session } = useSession();
    const [startTime, setStartTime] = useState<number | null>(null);

    useEffect(() => {
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
            setStartTime(Date.now());
        }
    }, [jobOfferId]);

    useEffect(() => {
        const checkIfAlreadyTaken = async () => {
            try {
                const response = await fetch(`/api/check-test-taken?jobOfferId=${jobOfferId}&userId=${session?.user?.id}`);
                if (response.ok) {
                    const { taken } = await response.json();
                    setHasAlreadyTaken(taken);
                }
            } catch (error) {
                console.error('Error checking if test was already taken:', error);
            }
        };

        if (jobOfferId && session?.user?.id) {
            checkIfAlreadyTaken();
        }
    }, [jobOfferId, session?.user?.id]);

    const handleAnswerChange = (questionId: string, answer: number) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!test || !session?.user?.id) return;

        const timeUsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

        try {
            const response = await fetch('/api/submit-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobOfferId,
                    answers,
                    userId: session.user.id,
                    timeUsed,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setGrade(result);
            } else {
                console.error('Failed to submit test');
            }
        } catch (error) {
            console.error('Error submitting test:', error);
        }
    };

    if (hasAlreadyTaken) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Test Already Taken</h1>
                <div className="bg-white p-6 rounded shadow-md text-center">
                    <p className="text-gray-600 mb-4">You have already taken this test. You cannot take it again.</p>
                    <button
                        onClick={() => router.push("/job-board")}
                        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Back to Job Board
                    </button>
                </div>
            </div>
        );
    }

    if (!test) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    if (grade) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Test Completed</h1>
                <div className="bg-white p-6 rounded shadow-md text-center">
                    <p className="text-gray-600 mb-4">You answered {grade.correctAnswers} out of {grade.totalQuestions} questions correctly.</p>
                    <button
                        onClick={() => router.push("/job-board")}
                        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Back to Job Board
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">{test.title}</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
                {test.questions.map((question, questionIndex) => (
                    <div key={question.id} className="mb-8">
                        <p className="text-xl text-gray-700 mb-4">{questionIndex + 1}. {question.description}</p>
                        <div className="grid grid-cols-2 gap-4">
                            {["answer1", "answer2", "answer3", "answer4"].map((answer, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg cursor-pointer transition duration-300 transform hover:scale-105 border-2 ${answers[question.id] === index + 1
                                        ? 'bg-blue-100 border-blue-500'
                                        : 'bg-gray-100 hover:bg-gray-200 border-transparent hover:border-blue-500'
                                        }`}
                                    onClick={() => handleAnswerChange(question.id, index + 1)}
                                >
                                    <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {question[answer as keyof Question]}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
                    >
                        Submit Test
                    </button>
                </div>
            </form>
        </div>
    );
}
