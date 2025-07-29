import React, { useState } from 'react';
import CommentList from './Comment';
import { EventActionBar } from './ActionBar';

function EventHeader({ userId, event }) {
    return (
        <div className="flex items-center gap-4 mb-4">
            {/* Author profile picture */}
            <img
                src={event.author_pfp || "https://i.pinimg.com/474x/e6/e4/df/e6e4df26ba752161b9fc6a17321fa286.jpg"}
                alt="Author"
                className="w-12 h-12 rounded-full object-cover"
            />
            {/* Info column */}
            <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-800 truncate">{event.author_name || "Author"}</div>
                <div className="text-sm text-gray-500">
                    {event.start_time && (
                        <span>Start: {new Date(event.start_time).toLocaleString()}</span>
                    )}
                    {event.end_time && (
                        <span> &middot; End: {new Date(event.end_time).toLocaleString()}</span>
                    )}
                    {event.location && (
                        <span> &middot; {event.location}</span>
                    )}
                </div>
            </div>
            {/* Follow button */}
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Follow
            </button>
        </div>
    );
}

// Event component displays event details and attendees
function Event({ userId, event }) {
    // State to toggle attendee details visibility
    const [showDetails, setShowDetails] = useState(false);

    // Attendees array; uses event.attendees or empty array if not present
    const attendees = event.attendees || [];

    return (
        <div className="event bg-blue-50 rounded-lg shadow-lg p-6 mb-6">
            <EventHeader userId={userId} event={event} />
            <div className="event-body mb-4">
                <p className="text-blue-900 mb-2">{event.description}</p>
                {event.image_url && (
                    <img
                        src={event.image_url}
                        alt="Event"
                        className="w-full max-h-96 object-cover rounded-md mb-3 border border-blue-200"
                    />
                )}
            </div>
            <EventActionBar userId={userId} event={event} />
            {/* <div className="mb-4">
                <button
                    className="text-blue-700 hover:underline text-sm"
                    onClick={() => setShowDetails(!showDetails)}
                >
                    {showDetails ? "Hide Attendees" : `Show Attendees (${attendees.length})`}
                </button>
                {showDetails && (
                    <ul className="mt-2">
                        {attendees.map((attendee, idx) => (
                            <li key={idx} className="text-blue-800 text-sm">
                                {attendee.name || attendee}
                            </li>
                        ))}
                    </ul>
                )}
            </div> */}
            <CommentList userId={userId} post={event} />
        </div>
    );
}

export default Event;
