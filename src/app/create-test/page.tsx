'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Question {
    description: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: number;
}

export default function CreateTest() {
    const [title, setTitle] = useState<string>("");
    const [jobOfferId, setJobOfferId] = useState<string>("cm0jhippk0000av4o8ggfmiwb"); // This should be set based on the job offer
    const [questions, setQuestions] = useState<Question[]>([
        { description: "", answer1: "", answer2: "", answer3: "", answer4: "", correctAnswer: 1 },
    ]);
    const router = useRouter();

    const handleQuestionChange = (index: number, field: keyof Question, value: string | number) => {
        const newQuestions = [...questions];
        if (field === "correctAnswer") {
            newQuestions[index][field] = value as number;
        } else {
            newQuestions[index][field] = value as string;
        }
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { description: "", answer1: "", answer2: "", answer3: "", answer4: "", correctAnswer: 1 }]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/create-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, jobOfferId, questions }),
            });

            if (response.ok) {
                // Redirect or show success message
                router.push("/");
            } else {
                console.error('Failed to create test');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Create a Test</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="title">
                        Test Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border-2 rounded"
                        required
                    />
                </div>
                {questions.map((question, index) => (
                    <div key={index} className="my-4 p-4 border-2 rounded">
                        <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor={`description-${index}`}>
                            Question {index + 1}
                        </label>
                        <input
                            id={`description-${index}`}
                            type="text"
                            value={question.description}
                            onChange={(e) => handleQuestionChange(index, "description", e.target.value)}
                            className="w-full px-3 py-2 border-2 rounded"
                            required
                        />
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            {["answer1", "answer2", "answer3", "answer4"].map((answer, i) => (
                                <div key={i}>
                                    <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor={`${answer}-${index}`}>
                                        Answer {i + 1}
                                    </label>
                                    <input
                                        id={`${answer}-${index}`}
                                        type="text"
                                        value={question[answer as keyof Question]}
                                        onChange={(e) => handleQuestionChange(index, answer as keyof Question, e.target.value)}
                                        className="w-full px-3 py-2 border-2 rounded"
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mt-2">
                            <label className="block text-gray-800 text-sm font-bold mb-2">
                                Correct Answer
                            </label>
                            <select
                                value={question.correctAnswer}
                                onChange={(e) => handleQuestionChange(index, "correctAnswer", parseInt(e.target.value))}
                                className="w-full px-3 py-2 border-2 rounded"
                            >
                                <option value={1}>Answer 1</option>
                                <option value={2}>Answer 2</option>
                                <option value={3}>Answer 3</option>
                                <option value={4}>Answer 4</option>
                            </select>
                        </div>
                    </div>
                ))}
                <div className="text-center mb-4">
                    <button
                        type="button"
                        onClick={addQuestion}
                        className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition duration-300"
                    >
                        Add Question
                    </button>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Create Test
                    </button>
                </div>
            </form>
        </div>
    );
}
