import React, { useRef, useEffect } from "react";
import Message from "./Message";

/**
 * MessageList component - Scrollable container for messages
 * @param {Object} props
 * @param {Array} props.messages - Array of message objects
 * @param {boolean} props.loading - Loading state
 * @param {string} props.error - Error message
 * @param {number} props.userId - Current user ID
 * @param {function} props.onLoadMore - Callback to load more messages
 * @param {boolean} props.hasMore - Whether there are more messages to load
 */
function MessageList({ chat, messages, loading, error, userId, onLoadMore, hasMore }) {
    const messagesEndRef = useRef(null);
    const containerRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Handle infinite scroll
    const handleScroll = () => {
        if (!containerRef.current || !hasMore || loading) return;
        
        const { scrollTop } = containerRef.current;
        if (scrollTop === 0) {
            onLoadMore();
        }
    };

    useEffect(() => {
        // Scroll to bottom when messages change (new message sent)
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages.length]);

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-500">
                    <div className="text-red-500 mb-2">⚠️</div>
                    <div className="font-medium mb-1">Failed to load messages</div>
                    <div className="text-sm">{error}</div>
                    <button 
                        onClick={() => onLoadMore()}
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (messages.length === 0 && !loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-500">
                    <div className="text-4xl mb-4">💬</div>
                    <div className="font-medium mb-1">No messages yet</div>
                    <div className="text-sm">Start the conversation by sending a message</div>
                </div>
            </div>
        );
    }

    return (
        <div 
            ref={containerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
            onScroll={handleScroll}
        >
            {loading && hasMore && (
                <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <div className="text-sm text-gray-500 mt-2">Loading messages...</div>
                </div>
            )}
            
            {messages.map((message, index) => (
                <Message 
                    key={message.id || index}
                    chatType={chat.type}
                    message={message}
                    isOwnMessage={message.sender_id === userId}
                    showTimestamp={index === messages.length - 1 || 
                        messages[index + 1]?.sender_id !== message.sender_id ||
                        new Date(message.timestamp).getTime() - new Date(messages[index + 1]?.timestamp).getTime() > 300000} // 5 minutes
                />
            ))}
            
            <div ref={messagesEndRef} />
        </div>
    );
}

export default MessageList;
