import React, { useEffect, useState } from "react";

export default function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/events")
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error("Error fetching events:", err));
    }, []);

    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-indigo-700 mb-6">Upcoming Events</h1>

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
