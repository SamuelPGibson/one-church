import React, { useState } from 'react';
import CommentList from './Comment';
import { EventActionBar } from './ActionBar';
import UserLink from '../UserLink';
import MediaFrame from './MediaFrame';

function EventHeader({ userId, event, showContent, setShowContent, toggleShowContent }) {
    const handleToggleShowContent = () => {
        setShowContent(!showContent);
    };
    
    return (
        <div className="flex items-center gap-4 mb-4">
            {/* Author profile picture */}
            <UserLink 
                userId={event.author_id} 
                showProfilePic={true}
                profilePicUrl={event.author_pfp || "https://i.pinimg.com/474x/e6/e4/df/e6e4df26ba752161b9fc6a17321fa286.jpg"}
                profilePicSize="w-12 h-12"
                className="flex-shrink-0"
            />
            {/* Info column */}
            <div className="flex-1 min-w-0">
                <UserLink 
                    userId={event.author_id}
                    className="font-semibold text-gray-800 truncate hover:text-indigo-600"
                >
                    {event.author_name || "Author"}
                </UserLink>
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
            {(userId && userId != event.author_id && !toggleShowContent) ? (
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    Follow
                </button>
            ) : null}
            {(toggleShowContent) ? (
                <button className="text-blue-500 hover:text-blue-600" onClick={handleToggleShowContent}>
                    {showContent ? "Hide Content" : "Show Content"}
                </button>
            ) : null}
        </div>
    );
}

// Event component displays event details and attendees
function Event({ userId, user, event, hideContent }) {
    // State to toggle content visibility
    const [showContent, setShowContent] = useState(!hideContent);

    // Attendees array; uses event.attendees or empty array if not present
    const attendees = event.attendees || [];

    return (
        <div className="event bg-blue-50 rounded-lg shadow-lg p-6 mb-6">
            <EventHeader 
                userId={userId} 
                event={event} 
                showContent={showContent}
                setShowContent={setShowContent}
                toggleShowContent={hideContent}
            />
            <div className="event-body mb-4">
                <p className="text-blue-900 mb-2">{event.description}</p>
                {showContent && (
                    <MediaFrame post={event} />
                )}
            </div>
            {showContent && (
                <EventActionBar userId={userId} user={user} event={event} />
            )}
            {showContent && (
                <CommentList userId={userId} user={user} post={event} />
            )}
        </div>
    );
}

export default Event;
