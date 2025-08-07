import React from "react";

/**
 * MessageTimestamp component - Displays message timestamp
 * @param {Object} props
 * @param {string} props.timestamp - ISO timestamp string
 */
function MessageTimestamp({ timestamp }) {
    if (!timestamp) return null;

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        // Today
        if (diffInHours < 24 && date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        
        // Yesterday
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        }
        
        // This week
        if (diffInHours < 168) { // 7 days
            return date.toLocaleDateString([], { weekday: 'short' });
        }
        
        // Older
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    return (
        <div className="text-xs text-gray-500 mt-1 text-center">
            {formatTimestamp(timestamp)}
        </div>
    );
}

export default MessageTimestamp;
