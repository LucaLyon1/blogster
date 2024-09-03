'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ProfileView from '@/components/ProfileView';
import ProfileForm from '@/components/ProfileForm';
import { useParams } from 'next/navigation';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const { data: session } = useSession();
    const params = useParams();
    const profileId = params.id as string;

    useEffect(() => {
        const fetchProfileData = async () => {
            const response = await fetch(`/api/profile/${profileId}`);
            if (response.ok) {
                const data = await response.json();
                setProfileData(data);
            }
        };
        fetchProfileData();
    }, [profileId]);

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);
    const handleSave = async (updatedData) => {
        const response = await fetch(`/api/profile/${profileId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        if (response.ok) {
            setProfileData(updatedData);
            setIsEditing(false);
        } else {
            alert('Failed to update profile');
        }
    };

    if (!profileData) return <div>Loading...</div>;

    const isOwnProfile = session?.user?.id === profileId;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                {isOwnProfile ? 'Your Profile' : `${profileData.name}'s Profile`}
            </h1>
            {isEditing ? (
                <ProfileForm
                    initialData={profileData}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <ProfileView
                    profileData={profileData}
                    onEdit={isOwnProfile ? handleEdit : undefined}
                />
            )}
        </div>
    );
}