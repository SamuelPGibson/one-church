import React, { useState } from "react";

/**
 * ChatInfo component - Modal for chat details and settings
 * @param {Object} props
 * @param {number} props.chatId - Chat ID
 * @param {Object} props.chatInfo - Chat information
 * @param {function} props.onClose - Callback to close the modal
 * @param {function} props.onChatInfoUpdate - Callback to update chat info
 */
function ChatInfo({ chatId, chatInfo, onClose, onChatInfoUpdate }) {
    const [activeTab, setActiveTab] = useState("info");
    const [imageError, setImageError] = useState(false);

    if (!chatInfo) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <div className="text-center">
                        <div className="text-gray-500">Loading chat info...</div>
                    </div>
                </div>
            </div>
        );
    }

    const isGroupChat = chatInfo.type === "group";
    const defaultImage = isGroupChat ? "/default-group.png" : "/default-pfp.png";
    const displayImage = imageError ? defaultImage : (isGroupChat ? chatInfo.image_url : chatInfo.other_pfp) || defaultImage;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-medium">Chat Info</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b">
                    <button
                        className={`flex-1 py-3 px-4 text-sm font-medium ${
                            activeTab === "info" 
                                ? "text-blue-600 border-b-2 border-blue-600" 
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab("info")}
                    >
                        Info
                    </button>
                    {isGroupChat && (
                        <button
                            className={`flex-1 py-3 px-4 text-sm font-medium ${
                                activeTab === "members" 
                                    ? "text-blue-600 border-b-2 border-blue-600" 
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => setActiveTab("members")}
                        >
                            Members
                        </button>
                    )}
                    <button
                        className={`flex-1 py-3 px-4 text-sm font-medium ${
                            activeTab === "settings" 
                                ? "text-blue-600 border-b-2 border-blue-600" 
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setActiveTab("settings")}
                    >
                        Settings
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto max-h-96">
                    {activeTab === "info" && (
                        <div className="space-y-4">
                            <div className="text-center">
                                <img
                                    src={displayImage}
                                    alt={isGroupChat ? chatInfo.name : chatInfo.other_name}
                                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                                    onError={() => setImageError(true)}
                                />
                                <h4 className="text-lg font-medium">
                                    {isGroupChat ? chatInfo.name : chatInfo.other_name}
                                </h4>
                                {isGroupChat && (
                                    <p className="text-sm text-gray-500">
                                        {chatInfo.member_count || 0} members
                                    </p>
                                )}
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Type:</span>
                                    <span className="font-medium">
                                        {isGroupChat ? "Group Chat" : "Direct Message"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Created:</span>
                                    <span className="font-medium">
                                        {new Date(chatInfo.created_at || Date.now()).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "members" && isGroupChat && (
                        <div className="space-y-3">
                            <h4 className="font-medium mb-3">Group Members</h4>
                            {/* This would be populated with actual member data */}
                            <div className="text-center text-gray-500 py-4">
                                Member list would be displayed here
                            </div>
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium mb-2">Notifications</h4>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" defaultChecked />
                                    <span className="text-sm">Mute notifications</span>
                                </label>
                            </div>
                            
                            <div>
                                <h4 className="font-medium mb-2">Privacy</h4>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span className="text-sm">Read receipts</span>
                                </label>
                            </div>
                            
                            {isGroupChat && (
                                <div className="pt-4 border-t">
                                    <button className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                                        Leave Group
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatInfo;
