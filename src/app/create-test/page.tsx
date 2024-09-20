'use client'

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaPlus, FaTrash } from 'react-icons/fa';
import { IndustryFilter } from '@/components/IndustryFilter';
import { Suspense } from 'react';

interface Question {
    description: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: number;
}

interface TestTemplate {
    id: string;
    title: string;
    description: string;
    questions: Question[];
    industry: string;
}

const ALL_INDUSTRIES = ['Finance', 'Technology', 'Design', 'Engineering', 'Other'];

export default function CreateTest() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateTestContent />
        </Suspense>
    );
}

function CreateTestContent() {
    const [title, setTitle] = useState<string>("");
    const [jobOfferId, setJobOfferId] = useState<string>("");
    const [questions, setQuestions] = useState<Question[]>([
        { description: "", answer1: "", answer2: "", answer3: "", answer4: "", correctAnswer: 1 },
    ]);
    const [templates, setTemplates] = useState<TestTemplate[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<string>("");
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();

    useEffect(() => {
        const jobOfferId = searchParams.get("jobOfferId");
        if (jobOfferId) {
            setJobOfferId(jobOfferId);
        }
        fetchTemplates();
    }, [searchParams]);

    const fetchTemplates = async () => {
        try {
            const response = await fetch('/api/test-templates');
            if (response.ok) {
                const data = await response.json();
                setTemplates(data);
            } else {
                console.error('Failed to fetch templates');
            }
        } catch (error) {
            console.error('Error fetching templates:', error);
        }
    };

    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const templateId = e.target.value;
        setSelectedTemplate(templateId);
        if (templateId) {
            const template = templates.find(t => t.id === templateId);
            if (template) {
                setTitle(template.title);
                setQuestions(template.questions);
            }
        }
    };

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

    const deleteQuestion = (index: number) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleIndustryToggle = (industry: string) => {
        setSelectedIndustries(prev =>
            prev.includes(industry)
                ? prev.filter(i => i !== industry)
                : [...prev, industry]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/create-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, jobOfferId, questions, userId: session?.user?.id }),
            });

            if (response.ok) {
                router.push("/");
            } else {
                console.error('Failed to create test');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Create a Test</h1>
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Select Industries
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {ALL_INDUSTRIES.map((industry) => (
                                <IndustryFilter
                                    key={industry}
                                    industry={industry}
                                    isSelected={selectedIndustries.includes(industry)}
                                    onClick={() => handleIndustryToggle(industry)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="template">
                            Select a Template (Optional)
                        </label>
                        <select
                            id="template"
                            value={selectedTemplate}
                            onChange={handleTemplateChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a template</option>
                            {templates
                                .filter((template) => {
                                    if (selectedIndustries.length === 0) return true;
                                    if (selectedIndustries.includes('Other')) {
                                        return !ALL_INDUSTRIES.slice(0, -1).includes(template.industry) || selectedIndustries.includes(template.industry);
                                    }
                                    return selectedIndustries.includes(template.industry);
                                })
                                .map((template) => (
                                    <option key={template.id} value={template.id}>
                                        {template.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Test Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="Enter the test title"
                        />
                    </div>
                    <div className="space-y-8">
                        {questions.map((question, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow relative">
                                <button
                                    type="button"
                                    onClick={() => deleteQuestion(index)}
                                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                    aria-label="Delete question"
                                >
                                    <FaTrash />
                                </button>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Question {index + 1}</h3>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`description-${index}`}>
                                        Question Text
                                    </label>
                                    <textarea
                                        id={`description-${index}`}
                                        value={question.description}
                                        onChange={(e) => handleQuestionChange(index, "description", e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        placeholder="Enter the question"
                                        rows={3}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    {["answer1", "answer2", "answer3", "answer4"].map((answer, i) => (
                                        <div key={i}>
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`${answer}-${index}`}>
                                                Answer {i + 1}
                                            </label>
                                            <input
                                                id={`${answer}-${index}`}
                                                type="text"
                                                value={question[answer as keyof Question]}
                                                onChange={(e) => handleQuestionChange(index, answer as keyof Question, e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                                placeholder={`Enter answer ${i + 1}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Correct Answer
                                    </label>
                                    <select
                                        value={question.correctAnswer}
                                        onChange={(e) => handleQuestionChange(index, "correctAnswer", parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value={1}>Answer 1</option>
                                        <option value={2}>Answer 2</option>
                                        <option value={3}>Answer 3</option>
                                        <option value={4}>Answer 4</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button
                            type="button"
                            onClick={addQuestion}
                            className="flex items-center bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300 mr-4"
                        >
                            <FaPlus className="mr-2" /> Add Question
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Create Test
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
