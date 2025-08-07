import React, { useState } from "react";
import ChatInfo from "./ChatInfo";

/**
 * ChatHeader component - Displays chat information and actions
 * @param {Object} props
 * @param {number} props.chatId - Chat ID
 * @param {Object} props.chatInfo - Chat information
 * @param {function} props.onChatInfoUpdate - Callback to update chat info
 */
function ChatHeader({ chatId, chatInfo, onChatInfoUpdate }) {
    const [showChatInfo, setShowChatInfo] = useState(false);
    const [imageError, setImageError] = useState(false);

    if (!chatInfo) {
        return (
            <div className="flex items-center justify-between p-4 border-b bg-white">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                        <div className="font-medium text-gray-900">Loading...</div>
                        <div className="text-sm text-gray-500">Loading chat info</div>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </button>
            </div>
        );
    }

    const isGroupChat = chatInfo.type === "group";
    const displayName = isGroupChat ? chatInfo.name : chatInfo.other_name;
    const defaultImage = isGroupChat ? "/default-group.png" : "/default-pfp.png";
    const displayImage = imageError ? defaultImage : (isGroupChat ? chatInfo.image_url : chatInfo.other_pfp) || defaultImage;

    return (
        <>
            <div className="flex items-center justify-between p-4 border-b bg-white">
                <div className="flex items-center">
                    <img
                        src={displayImage}
                        alt={displayName}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                        onError={() => setImageError(true)}
                    />
                    <div>
                        <div className="font-medium text-gray-900">{displayName}</div>
                        <div className="text-sm text-gray-500">
                            {isGroupChat 
                                ? `${chatInfo.member_count || 0} members`
                                : "Online" // You can add online status logic here
                            }
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center space-x-2">
                    {isGroupChat && (
                        <button 
                            className="text-gray-400 hover:text-gray-600 p-1"
                            title="Group info"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                    )}
                    
                    <button 
                        className="text-gray-400 hover:text-gray-600 p-1"
                        onClick={() => setShowChatInfo(true)}
                        title="Chat info"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>
                </div>
            </div>

            {showChatInfo && (
                <ChatInfo 
                    chatId={chatId}
                    chatInfo={chatInfo}
                    onClose={() => setShowChatInfo(false)}
                    onChatInfoUpdate={onChatInfoUpdate}
                />
            )}
        </>
    );
}

export default ChatHeader;
