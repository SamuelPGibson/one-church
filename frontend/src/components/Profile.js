import React, { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return (
            <main className="min-h-screen flex items-center justify-center text-gray-600">
                <p>You must be logged in to view your profile.</p>
            </main>
        );
    }

    return (
        <main className="max-w-xl mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                    <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-indigo-700">{user.name}</h1>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                </div>
                <p className="text-gray-700 mb-4">{user.bio}</p>
                <div className="text-sm text-gray-600">
                    <p><strong>Followers:</strong> {user.followers.length}</p>
                    <p><strong>Following:</strong> {user.following.length}</p>
                </div>
            </div>
        </main>
    );
}
