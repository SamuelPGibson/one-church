import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../api/api";

const ProfilePage = ({ userId }) => {
    const { profileUserId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use the profileUserId from URL if available, otherwise use the current userId
    const targetUserId = profileUserId || userId;

    useEffect(() => {
        const fetchUser = async () => {
            if (!targetUserId) {
                setError("No user ID provided");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const result = await getUser(targetUserId);
                
                if (result.error) {
                    setError(result.error);
                } else {
                    setUser(result.data);
                }
            } catch (err) {
                setError("Failed to load user profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [targetUserId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Profile</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-gray-400 text-6xl mb-4">👤</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">User Not Found</h2>
                    <p className="text-gray-600">The requested user profile could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="flex items-center space-x-6">
                        {/* Profile Picture */}
                        <div className="flex-shrink-0">
                            <img
                                src={user.pfp_url || "/default-pfp.png"}
                                alt={`${user.first_name || user.username}'s profile`}
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                                onError={(e) => {
                                    e.target.src = "/default-pfp.png";
                                }}
                            />
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {user.first_name && user.last_name 
                                    ? `${user.first_name} ${user.last_name}`
                                    : user.username
                                }
                            </h1>
                            <p className="text-gray-600 text-lg">@{user.username}</p>
                            {user.email && (
                                <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Information Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                            
                            <div className="space-y-6">
                                {/* Name Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name
                                        </label>
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                            {user.first_name || "Not provided"}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name
                                        </label>
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                            {user.last_name || "Not provided"}
                                        </p>
                                    </div>
                                </div>

                                {/* Username */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Username
                                    </label>
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                        @{user.username}
                                    </p>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                        {user.email || "Not provided"}
                                    </p>
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Bio
                                    </label>
                                    <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md min-h-[60px]">
                                        {user.bio || "No bio provided"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Member since</span>
                                    <span className="text-gray-900 font-medium">
                                        {user.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">User ID</span>
                                    <span className="text-gray-900 font-mono text-sm">
                                        {user.id}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {userId === targetUserId && (
                            <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
                                        Edit Profile
                                    </button>
                                    <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
