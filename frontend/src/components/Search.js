import React, { useState } from "react";

export default function Search({ users }) {
    const [query, setQuery] = useState("");

    // Filter users by name or username that match the query (case insensitive)
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="mb-8">
            <input
                type="text"
                placeholder="Search users by name or username..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-indigo-600"
            />

            {query && (
                <ul className="mt-4 max-h-60 overflow-auto border rounded-md bg-white shadow-md">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <li key={user.id} className="p-2 hover:bg-indigo-100 cursor-pointer">
                                <img src={user.profilePicture} alt={user.name} className="inline-block w-8 h-8 rounded-full mr-2 object-cover" />
                                <span className="font-semibold">{user.name}</span> ({user.username})
                            </li>
                        ))
                    ) : (
                        <li className="p-2 text-gray-500">No users found</li>
                    )}
                </ul>
            )}
        </div>
    );
}

