import React, { useEffect, useState } from "react";
import { getUserFeed } from "../../api/api";
import Post from "./Post";
import Event from "./Event";



export default function ContentList({ userId }) {
    const [items, setItems] = useState([]);

    const fetchEvents = async () => {
        try {
            const response = await getUserFeed(userId);
            if (response.success) {
                setItems(response.data);
            } else {
                console.error("Failed to fetch events:", response.message);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-indigo-700 mb-6">Upcoming Events</h1>

            {/* temp button to refresh events */}
            <button
                className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                onClick={fetchEvents}
            >
                Refresh Events
            </button>

            {items.length === 0 ? (
                <p className="text-gray-500">No events available.</p>
            ) : (
                items.map(item => (
                    item.type === "post" ? (
                        <Post key={item.id} post={item} />
                    ) : item.type === "event" ? (
                        <Event key={item.id} event={item} />
                    ) : (
                        <div key={item.id}>Unknown content type</div>
                    )
                ))
            )}
        </main>
    );
}
