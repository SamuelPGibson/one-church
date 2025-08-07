import React, { useState } from "react";
import { reactToChatMessage, removeChatMessageReaction } from "../../../api/api";

/**
 * MessageReactions component - Displays emoji reactions
 * @param {Object} props
 * @param {Array} props.reactions - Array of reaction objects
 * @param {number} props.messageId - Message ID
 * @param {boolean} props.isOwnMessage - Whether this is the user's own message
 */
function MessageReactions({ reactions, messageId, isOwnMessage }) {
    const [localReactions, setLocalReactions] = useState(reactions || []);
    const [showReactionPicker, setShowReactionPicker] = useState(false);

    const commonReactions = ["👍", "❤️", "😊", "😂", "😮", "😢", "😡"];

    const handleAddReaction = async (reaction) => {
        try {
            const res = await reactToChatMessage(messageId, messageId, 1, reaction); // Using messageId as userId for demo
            if (res.success) {
                setLocalReactions(prev => [...prev, { emoji: reaction, count: 1 }]);
            }
        } catch (err) {
            console.error("Failed to add reaction:", err);
        }
        setShowReactionPicker(false);
    };

    const handleRemoveReaction = async (reactionId) => {
        try {
            const res = await removeChatMessageReaction(messageId, messageId, 1, reactionId);
            if (res.success) {
                setLocalReactions(prev => prev.filter(r => r.id !== reactionId));
            }
        } catch (err) {
            console.error("Failed to remove reaction:", err);
        }
    };

    return (
        <div className="mt-2">
            {/* Display existing reactions */}
            {localReactions.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {localReactions.map((reaction, index) => (
                        <button
                            key={index}
                            className="bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-1 text-xs flex items-center gap-1"
                            onClick={() => handleRemoveReaction(reaction.id)}
                        >
                            <span>{reaction.emoji}</span>
                            <span>{reaction.count}</span>
                        </button>
                    ))}
                </div>
            )}
            
            {/* Reaction picker */}
            <div className="relative">
                <button
                    className="text-gray-400 hover:text-gray-600 text-sm"
                    onClick={() => setShowReactionPicker(!showReactionPicker)}
                >
                    😊
                </button>
                
                {showReactionPicker && (
                    <div className="absolute bottom-full mb-2 bg-white border rounded-lg shadow-lg p-2 z-10">
                        <div className="flex gap-1">
                            {commonReactions.map((emoji) => (
                                <button
                                    key={emoji}
                                    className="hover:bg-gray-100 rounded p-1 text-lg"
                                    onClick={() => handleAddReaction(emoji)}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MessageReactions;
