import React, { useState } from 'react';
import { ChatList } from './ChatList';
import ChatFrame from './chat_frame/ChatFrame';

/**
 * MessagingPage component - Main messaging interface
 * @param {Object} props
 * @param {number} props.userId - Current user ID
 */
function MessagingPage({ userId }) {
    const [selectedChat, setSelectedChat] = useState(null);

    if (!userId) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center">
                    <div className="text-4xl mb-4">💬</div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to Messaging</h2>
                    <p className="text-gray-600">Please log in to start messaging</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Left Sidebar - Chat List */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
                    <p className="text-sm text-gray-500 mt-1">Your conversations</p>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                    <ChatList 
                        userId={userId} 
                        selectedChat={selectedChat}
                        onChatSelect={setSelectedChat}
                    />
                </div>
            </div>

            {/* Right Side - Chat Frame */}
            <div className="flex-1 flex flex-col">
                <ChatFrame 
                    userId={userId} 
                    chat={selectedChat}
                    chatId={selectedChat?.id}
                />
            </div>
        </div>
    );
}

export default MessagingPage;
