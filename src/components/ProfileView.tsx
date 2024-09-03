import { FaEdit, FaBriefcase, FaEnvelope, FaPhone } from 'react-icons/fa';
import Image from 'next/image';

interface Job {
    title: string;
    duration: string;
    company: string;
}

interface ProfileData {
    name: string;
    image: string;
    description: string;
    currentJobTitle: string;
    jobHistory: Job[];
    email: string;
    phoneNumber: string;
}

interface ProfileViewProps {
    profileData: ProfileData;
    onEdit?: () => void;
}

export default function ProfileView({ profileData, onEdit }: ProfileViewProps) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
                {onEdit && (
                    <button
                        onClick={onEdit}
                        className="absolute top-4 right-4 bg-white text-blue-500 hover:bg-blue-100 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline flex items-center"
                    >
                        <FaEdit className="mr-2" /> Edit Profile
                    </button>
                )}
            </div>
            <div className="relative px-6 py-4">
                <div className="absolute -top-16 left-6">
                    <Image
                        src={profileData.image || '/default-avatar.png'}
                        alt={profileData.name}
                        width={128}
                        height={128}
                        className="rounded-full border-4 border-white shadow-lg"
                    />
                </div>
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-gray-800">{profileData.name}</h2>
                    <p className="text-xl text-gray-600 mt-1">{profileData.currentJobTitle}</p>
                </div>
            </div>
            <div className="px-6 py-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">About</h3>
                <p className="text-gray-600">{profileData.description || 'No description provided'}</p>
            </div>
            <div className="px-6 py-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Job History</h3>
                {profileData.jobHistory && profileData.jobHistory.length > 0 ? (
                    <ul className="space-y-4">
                        {profileData.jobHistory.map((job, index) => (
                            <li key={index} className="flex items-start">
                                <FaBriefcase className="text-blue-500 mt-1 mr-3" />
                                <div>
                                    <p className="font-semibold">{job.title}</p>
                                    <p className="text-sm text-gray-600">{job.company} - {job.duration}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No job history provided</p>
                )}
            </div>
            <div className="px-6 py-4 bg-gray-50">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Contact Information</h3>
                <div className="flex items-center mb-2">
                    <FaEnvelope className="text-gray-500 mr-2" />
                    <p className="text-gray-600">{profileData.email}</p>
                </div>
                <div className="flex items-center">
                    <FaPhone className="text-gray-500 mr-2" />
                    <p className="text-gray-600">{profileData.phoneNumber || 'Not provided'}</p>
                </div>
            </div>
        </div>
    );
}