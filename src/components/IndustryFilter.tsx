import React from 'react';
import { FaChartLine, FaLaptopCode, FaPencilRuler, FaCogs, FaEllipsisH } from 'react-icons/fa';

interface IndustryFilterProps {
    industry: string;
    isSelected: boolean;
    onClick: () => void;
}

const getIndustryIcon = (industry: string) => {
    switch (industry.toLowerCase()) {
        case 'finance':
            return <FaChartLine />;
        case 'technology':
            return <FaLaptopCode />;
        case 'design':
            return <FaPencilRuler />;
        case 'engineering':
            return <FaCogs />;
        default:
            return <FaEllipsisH />;
    }
};

const getIndustryColor = (industry: string, isSelected: boolean) => {
    switch (industry.toLowerCase()) {
        case 'finance':
            return isSelected ? 'bg-green-200 text-green-700' : 'bg-green-50 text-green-400';
        case 'technology':
            return isSelected ? 'bg-blue-200 text-blue-700' : 'bg-blue-50 text-blue-400';
        case 'design':
            return isSelected ? 'bg-purple-200 text-purple-700' : 'bg-purple-50 text-purple-400';
        case 'engineering':
            return isSelected ? 'bg-yellow-200 text-yellow-700' : 'bg-yellow-50 text-yellow-400';
        default:
            return isSelected ? 'bg-gray-200 text-gray-700' : 'bg-gray-50 text-gray-400';
    }
};

export const IndustryFilter: React.FC<IndustryFilterProps> = ({ industry, isSelected, onClick }) => {
    const icon = getIndustryIcon(industry);
    const colorClass = getIndustryColor(industry, isSelected);

    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center p-4 transition-all duration-200 ${colorClass} ${isSelected ? 'shadow-md' : 'hover:bg-opacity-80'} w-40 h-40 text-xl font-bold`}
        >
            <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">{icon}</span>
                <span>{industry}</span>
            </div>
        </button>
    );
};
