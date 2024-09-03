import { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

interface Job {
    title: string;
    duration: string;
    company: string;
}

interface ProfileData {
    description: string;
    currentJobTitle: string;
    jobHistory: Job[];
    email: string;
    phoneNumber: string;
}

interface ProfileFormProps {
    initialData: ProfileData;
    onSave: (data: ProfileData) => void;
    onCancel: () => void;
}

export default function ProfileForm({ initialData, onSave, onCancel }: ProfileFormProps) {
    const [profileData, setProfileData] = useState<ProfileData>({ ...initialData, jobHistory: initialData.jobHistory || [] });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleJobHistoryChange = (index: number, field: keyof Job, value: string) => {
        const newJobHistory = [...profileData.jobHistory];
        newJobHistory[index] = { ...newJobHistory[index], [field]: value };
        setProfileData(prev => ({ ...prev, jobHistory: newJobHistory }));
    };

    const addJob = () => {
        setProfileData(prev => ({
            ...prev,
            jobHistory: [...prev.jobHistory, { title: '', duration: '', company: '' }]
        }));
    };

    const removeJob = (index: number) => {
        const newJobHistory = profileData.jobHistory.filter((_, i) => i !== index);
        setProfileData(prev => ({ ...prev, jobHistory: newJobHistory }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(profileData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={profileData.description}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows={4}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="currentJobTitle" className="block text-gray-700 text-sm font-bold mb-2">
                    Current Job Title
                </label>
                <input
                    type="text"
                    id="currentJobTitle"
                    name="currentJobTitle"
                    value={profileData.currentJobTitle}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Job History
                </label>
                {profileData.jobHistory.map((job, index) => (
                    <div key={index} className="mb-2 p-2 border rounded">
                        <input
                            type="text"
                            placeholder="Job Title"
                            value={job.title}
                            onChange={(e) => handleJobHistoryChange(index, 'title', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Company"
                            value={job.company}
                            onChange={(e) => handleJobHistoryChange(index, 'company', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Duration"
                            value={job.duration}
                            onChange={(e) => handleJobHistoryChange(index, 'duration', e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                        />
                        <button
                            type="button"
                            onClick={() => removeJob(index)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addJob}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Add Job
                </button>
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                >
                    <FaSave className="mr-2" /> Save Changes
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                >
                    <FaTimes className="mr-2" /> Cancel
                </button>
            </div>
        </form>
    );
}