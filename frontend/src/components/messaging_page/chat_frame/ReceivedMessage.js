import React, { useState } from "react";
import MessageReactions from "./MessageReactions";
import MessageActions from "./MessageActions";

/**
 * ReceivedMessage component - Other users' messages
 * @param {Object} props
 * @param {string} props.chatType - Type of chat ("group" or "direct")
 * @param {Object} props.message - Message object
 */
function ReceivedMessage({ chatType, message }) {
    const [showActions, setShowActions] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <div className="flex flex-col">
            {/* Author Name for Group Chats */}
            {chatType === "group" && message.author_name && (
                <div className="text-xs text-gray-600 font-medium mb-1 ml-10">
                    {message.author_name}
                </div>
            )}
            
            {/* Message Row */}
            <div className="flex items-start space-x-2 group">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                    <img
                        src={imageError ? "/default-pfp.png" : (message.author_pfp || "/default-pfp.png")}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                        onError={() => setImageError(true)}
                    />
                </div>
                
                {/* Message Content */}
                <div className="relative flex-1">
                    <div 
                        className="bg-gray-200 text-gray-900 rounded-lg px-3 py-2 max-w-full break-words cursor-pointer hover:bg-gray-300 transition-colors"
                        onClick={() => setShowActions(!showActions)}
                    >
                        <div className="text-sm">{message.content}</div>
                        
                        {message.reactions && message.reactions.length > 0 && (
                            <MessageReactions 
                                reactions={message.reactions}
                                messageId={message.id}
                                isOwnMessage={false}
                            />
                        )}
                    </div>
                    
                    {showActions && (
                        <MessageActions 
                            message={message}
                            isOwnMessage={false}
                            onClose={() => setShowActions(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReceivedMessage;
