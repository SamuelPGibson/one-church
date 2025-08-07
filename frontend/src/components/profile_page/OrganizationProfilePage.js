import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrganization } from "../../api/api";

const OrganizationProfilePage = () => {
    const { orgId } = useParams();
    const [organization, setOrganization] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrganization = async () => {
            if (!orgId) {
                setError("No organization ID provided");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const result = await getOrganization(orgId);
                if (result.error) {
                    setError(result.error);
                } else {
                    setOrganization(result.data);
                }
            } catch (err) {
                setError("Failed to load organization profile");
            } finally {
                setLoading(false);
            }
        };
        fetchOrganization();
    }, [orgId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading organization profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Organization</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!organization) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-gray-400 text-6xl mb-4">🏢</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Organization Not Found</h2>
                    <p className="text-gray-600">The requested organization profile could not be found.</p>
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
                            {/* Organization Icon */}
                            <div className="flex-shrink-0">
                                <img
                                    src={organization.pfp_url || "/default-pfp.png"}
                                    alt="Organization Profile"
                                    className="w-24 h-24 rounded-full object-cover shadow-lg bg-indigo-100 border-2 border-white"
                                    onError={e => { e.target.src = "/default-pfp.png"; }}
                                />
                            </div>

                            {/* Organization Info */}
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {organization.name || "Organization"}
                                </h1>
                                <p className="text-gray-600 text-lg">
                                    {organization.location || "Location not specified"}
                                </p>
                                {organization.description && (
                                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                                        {organization.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Organization Information Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Organization Information</h2>
                            
                            <div className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Organization Name
                                    </label>
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                        {organization.name || "Not provided"}
                                    </p>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Location
                                    </label>
                                    <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                        {organization.location || "Not provided"}
                                    </p>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md min-h-[60px]">
                                        {organization.description || "No description provided"}
                                    </div>
                                </div>

                                {/* Organization Type */}
                                {organization.type && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Organization Type
                                        </label>
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                            {organization.type}
                                        </p>
                                    </div>
                                )}

                                {/* Website */}
                                {organization.website && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Website
                                        </label>
                                        <a 
                                            href={organization.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:text-indigo-800 bg-gray-50 px-3 py-2 rounded-md block"
                                        >
                                            {organization.website}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Stats</h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Organization ID</span>
                                    <span className="text-gray-900 font-mono text-sm">
                                        {organization.id}
                                    </span>
                                </div>
                                
                                {organization.created_at && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Created</span>
                                        <span className="text-gray-900 font-medium">
                                            {new Date(organization.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}

                                {organization.member_count && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Members</span>
                                        <span className="text-gray-900 font-medium">
                                            {organization.member_count}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
                                    Join Organization
                                </button>
                                <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition">
                                    Contact Organization
                                </button>
                                <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition">
                                    Share Organization
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationProfilePage;
