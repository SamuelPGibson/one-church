import React, { useEffect, useState } from "react";
import { getUserFeed } from "../../api/api";


export default function ContentList({ userId }) {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const response = await getUserFeed(userId);
            if (response.success) {
                setEvents(response.data);
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

            {events.length === 0 ? (
                <p className="text-gray-500">No events available.</p>
            ) : (
                events.map(event => (
                    <div
                        key={event.id}
                        className="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                        <h2 className="text-xl font-semibold text-indigo-600">{event.title}</h2>
                        <p className="text-gray-700 mt-2">{event.description}</p>
                        <div className="text-sm text-gray-500 mt-4">
                            📍 <span>{event.location}</span> <br />
                            📅 <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))
            )}
        </main>
    );
}
