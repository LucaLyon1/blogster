'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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

    const handleSubmit = async () => {
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

    const handleNextQuestion = () => {
        if (test && currentQuestionIndex < test.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    if (hasAlreadyTaken) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
            </div>
        );
    }

    if (!test) {
        return <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;
    }

    if (grade) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
            </div>
        );
    }

    const currentQuestion = test.questions[currentQuestionIndex];
    const totalQuestions = test.questions.length;
    const completionPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    return (
        <div className="flex flex-col justify-between min-h-screen py-8 bg-gray-100">
            <div className="relative container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">{test.title}</h1>
                <div className="mb-4 bg-white rounded-full h-4">
                    <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                </div>
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={handlePreviousQuestion}
                        className={`text-gray-500 px-4 py-3 rounded-lg text-lg font-semibold hover:text-gray-800 transition duration-300 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentQuestionIndex === 0}
                    >
                        <FaArrowLeft className="inline-block mr-2" /> Previous
                    </button>
                    <div className="text-center text-blue-600 font-semibold">
                        Question {currentQuestionIndex + 1}/{totalQuestions}
                    </div>
                    <div className="invisible">
                        {/* This invisible div helps maintain the centering of the question counter */}
                        <FaArrowLeft className="inline-block mr-2" /> Previous
                    </div>
                </div>
                <div className="bg-white px-12 py-4 rounded-lg shadow-md flex flex-col justify-center items-center min-h-[60vh]">
                    <p className="text-2xl text-gray-800 mb-8 text-center">{currentQuestion.description}</p>
                    <div className="space-y-4 w-full max-w-md">
                        {["answer1", "answer2", "answer3", "answer4"].map((answer, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg cursor-pointer transition duration-300 flex items-start ${answers[currentQuestion.id] === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                onClick={() => handleAnswerChange(currentQuestion.id, index + 1)}
                            >
                                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center ${answers[currentQuestion.id] === index + 1
                                    ? 'border-white bg-white'
                                    : 'border-gray-400'
                                    }`}>
                                    {answers[currentQuestion.id] === index + 1 && (
                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    )}
                                </div>
                                <span className="flex-grow">{currentQuestion[answer as keyof Question]}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 w-full flex justify-end">
                        <button
                            onClick={handleNextQuestion}
                            className="bg-blue-500 text-white px-6 py-2 rounded-full text-base hover:bg-blue-600 transition duration-300 flex items-center m-auto"
                        >
                            {currentQuestionIndex === totalQuestions - 1 ? 'Submit Answers' : 'Next Question'}
                            {currentQuestionIndex !== totalQuestions - 1 && <FaArrowRight className="ml-2" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
