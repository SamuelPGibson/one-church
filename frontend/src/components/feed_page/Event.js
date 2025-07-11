import React, { useState } from 'react';
import { Comment } from './Comment';

// Event component displays event details and attendees
function Event({ userId, event }) {
    // State to toggle attendee details visibility
    const [showDetails, setShowDetails] = useState(false);

    // Attendees array; uses event.attendees or empty array if not present
    const attendees = event.attendees || [];

    return (
        <div className="event bg-white rounded-lg shadow-md p-6 mb-6">
            {/* Event header with author info */}
            <div className="event-header flex items-center mb-4">
                <span className="text-gray-700 font-semibold">Author: {event.authorId}</span>
            </div>
            {/* Event main content */}
            <div className="event-body mb-4">
                {/* Event image if available */}
                {event.imageUrl && (
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full max-h-96 object-cover rounded-md mb-3"
                    />
                )}
                {/* Event title */}
                <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                {/* Event description */}
                <p className="text-gray-800 mb-2">{event.description}</p>
                {/* Event location */}
                <span className="text-sm text-gray-500 block mb-1">
                    Location: {event.location}
                </span>
                {/* Event start time */}
                <span className="text-sm text-gray-500 block mb-1">
                    Start: {new Date(event.startTime).toLocaleString()}
                </span>
                {/* Event end time */}
                <span className="text-sm text-gray-500 block mb-1">
                    End: {new Date(event.endTime).toLocaleString()}
                </span>
            </div>
            {/* Button to toggle attendee list */}
            <button
                onClick={() => setShowDetails(!showDetails)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition mb-3"
            >
                {showDetails ? 'Hide Attendees' : 'Show Attendees'}
            </button>
            {/* Attendee list, shown if showDetails is true */}
            {showDetails && (
                <div className="event-attendees mt-4 border-t pt-4">
                    {attendees.length === 0 ? (
                        // Message if no attendees
                        <p className="text-gray-500 italic">No attendees yet.</p>
                    ) : (
                        // List of attendees
                        attendees.map((attendeeId) => (
                            <div key={attendeeId} className="text-gray-700">
                                Attendee: {attendeeId}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Event;
