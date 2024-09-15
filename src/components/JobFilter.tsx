import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface FilterProps {
    onFilter: (filters: any) => void;
}

export const JobFilter = ({ onFilter }: FilterProps) => {
    const [jobType, setJobType] = useState('');
    const [workLocation, setWorkLocation] = useState('');
    const [salaryRange, setSalaryRange] = useState([0, 100000]);

    const handleFilter = () => {
        onFilter({
            jobType,
            workLocation,
            salaryMin: salaryRange[0],
            salaryMax: salaryRange[1] === 100000 ? null : salaryRange[1],
        });
    };

    const formatSalary = (value: number) => {
        return value === 100000 ? '100k+' : `$${value.toLocaleString()}`;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Jobs</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobType">
                    Job Type
                </label>
                <select
                    id="jobType"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                >
                    <option value="">All</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="freelance">Freelance</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workLocation">
                    Work Location
                </label>
                <select
                    id="workLocation"
                    value={workLocation}
                    onChange={(e) => setWorkLocation(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                >
                    <option value="">All</option>
                    <option value="on-site">On-site</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Salary Range
                </label>
                <Slider
                    range
                    min={0}
                    max={100000}
                    step={1000}
                    value={salaryRange}
                    onChange={(value: number | number[]) => setSalaryRange(value as number[])}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>{formatSalary(salaryRange[0])}</span>
                    <span>{formatSalary(salaryRange[1])}</span>
                </div>
            </div>
            <button
                onClick={handleFilter}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
                Apply Filters
            </button>
        </div>
    );
}
