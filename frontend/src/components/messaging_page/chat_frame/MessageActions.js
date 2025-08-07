import React from "react";
import { deleteChatMessage } from "../../../api/api";

/**
 * MessageActions component - Context menu for message actions
 * @param {Object} props
 * @param {Object} props.message - Message object
 * @param {boolean} props.isOwnMessage - Whether this is the user's own message
 * @param {function} props.onClose - Callback to close the menu
 */
function MessageActions({ message, isOwnMessage, onClose }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        onClose();
    };

    const handleDelete = async () => {
        try {
            const res = await deleteChatMessage(message.chat_id, message.id);
            if (res.success) {
                // The parent component should handle message removal
                onClose();
            }
        } catch (err) {
            console.error("Failed to delete message:", err);
        }
    };

    const handleReact = () => {
        // This could open a reaction picker
        onClose();
    };

    return (
        <div className="absolute top-full mt-1 right-0 bg-white border rounded-lg shadow-lg py-1 z-20 min-w-32">
            <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                onClick={handleCopy}
            >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
            </button>
            
            <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                onClick={handleReact}
            >
                <span className="mr-2">😊</span>
                React
            </button>
            
            {isOwnMessage && (
                <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600 flex items-center"
                    onClick={handleDelete}
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                </button>
            )}
        </div>
    );
}

export default MessageActions;
