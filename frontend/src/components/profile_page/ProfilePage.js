import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../api/api";

const ProfilePage = ({ userId }) => {
    const { profileUserId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [saving, setSaving] = useState(false);

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
                    // Initialize edit form with current user data
                    setEditForm({
                        first_name: result.data.first_name || "",
                        last_name: result.data.last_name || "",
                        username: result.data.username || "",
                        email: result.data.email || "",
                        bio: result.data.bio || "",
                        pfp_url: result.data.pfp_url || ""
                    });
                }
            } catch (err) {
                setError("Failed to load user profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [targetUserId]);

    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const handleEditClick = () => {
        // Initialize form with current user data when entering edit mode
        setEditForm({
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            username: user.username || "",
            email: user.email || "",
            bio: user.bio || "",
            pfp_url: user.pfp_url || ""
        });
        setIsEditing(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const result = await updateUser(targetUserId, editForm);
            if (result.error) {
                alert("Failed to update profile: " + result.error);
            } else {
                // Update the user state with new data
                // Ensure we maintain the same data structure as the original user object
                const updatedUser = {
                    ...user, // Keep all existing user data
                    ...editForm, // Override with the updated form data
                    // Ensure we have the same structure as the original user object
                    id: user.id,
                    created_at: user.created_at
                };
                setUser(updatedUser);
                setIsEditing(false);
            }
        } catch (err) {
            alert("Failed to update profile");
        }
        setSaving(false);
    };

    const handleCancel = () => {
        // Reset form to original user data
        setEditForm({
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            username: user.username || "",
            email: user.email || "",
            bio: user.bio || "",
            pfp_url: user.pfp_url || ""
        });
        setIsEditing(false);
    };

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
                    <div className="flex items-center justify-between">
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

                        {/* Edit Button - Only show if user is viewing their own profile */}
                        {userId == targetUserId && !isEditing && (
                            <div className="flex-shrink-0">
                                <button
                                    onClick={handleEditClick}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        )}
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
                            
                            {isEditing ? (
                                // Edit Mode
                                <div className="space-y-6">
                                    {/* Name Section */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={editForm.first_name}
                                                onChange={handleEditChange}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={editForm.last_name}
                                                onChange={handleEditChange}
                                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Username */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={editForm.username}
                                            onChange={handleEditChange}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editForm.email}
                                            onChange={handleEditChange}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Bio */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Bio
                                        </label>
                                        <textarea
                                            name="bio"
                                            rows="3"
                                            value={editForm.bio}
                                            onChange={handleEditChange}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Tell us a bit about yourself..."
                                        />
                                    </div>

                                    {/* Profile Picture URL */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Profile Picture URL
                                        </label>
                                        <input
                                            type="url"
                                            name="pfp_url"
                                            value={editForm.pfp_url}
                                            onChange={handleEditChange}
                                            placeholder="https://example.com/your-photo.jpg"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-4 pt-4">
                                        <button
                                            onClick={handleCancel}
                                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
                                        >
                                            {saving ? "Saving..." : "Save Changes"}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // View Mode
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
                            )}
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
                        {userId === targetUserId && !isEditing && (
                            <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                                <div className="space-y-3">
                                    <button 
                                        onClick={handleEditClick}
                                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                                    >
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
