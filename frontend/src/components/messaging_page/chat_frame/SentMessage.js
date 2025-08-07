import React, { useState } from "react";
import MessageReactions from "./MessageReactions";
import MessageActions from "./MessageActions";

/**
 * SentMessage component - User's own messages
 * @param {Object} props
 * @param {Object} props.message - Message object
 */
function SentMessage({ message }) {
    const [showActions, setShowActions] = useState(false);

    return (
        <div className="relative group">
            <div 
                className="bg-blue-500 text-white rounded-lg px-3 py-2 max-w-full break-words cursor-pointer hover:bg-blue-600 transition-colors"
                onClick={() => setShowActions(!showActions)}
            >
                <div className="text-sm">{message.content}</div>
                
                {message.reactions && message.reactions.length > 0 && (
                    <MessageReactions 
                        reactions={message.reactions}
                        messageId={message.id}
                        isOwnMessage={true}
                    />
                )}
            </div>
            
            {showActions && (
                <MessageActions 
                    message={message}
                    isOwnMessage={true}
                    onClose={() => setShowActions(false)}
                />
            )}
        </div>
    );
}

export default SentMessage;
