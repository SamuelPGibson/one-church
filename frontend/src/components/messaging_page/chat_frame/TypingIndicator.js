import React from "react";

/**
 * TypingIndicator component - Shows when someone is typing
 * @param {Object} props
 * @param {boolean} props.isTyping - Whether someone is typing
 * @param {string} props.typingUser - Name of the user who is typing
 */
function TypingIndicator({ isTyping, typingUser }) {
    if (!isTyping) return null;

    return (
        <div className="flex items-center p-3 text-gray-500 text-sm">
            <div className="flex space-x-1 mr-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>{typingUser || "Someone"} is typing...</span>
        </div>
    );
}

export default TypingIndicator;
