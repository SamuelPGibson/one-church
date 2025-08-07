import React from "react";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import MessageTimestamp from "./MessageTimestamp";

/**
 * Message component - Unified message display
 * @param {Object} props
 * @param {Object} props.message - Message object
 * @param {boolean} props.isOwnMessage - Whether this is the user's own message
 * @param {boolean} props.showTimestamp - Whether to show timestamp
 */
function Message({ chatType, message, isOwnMessage, showTimestamp }) {
    if (!message) return null;

    const MessageComponent = isOwnMessage ? SentMessage : ReceivedMessage;

    return (
        <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-xs lg:max-w-md">
                <MessageComponent chatType={chatType} message={message} />
                {showTimestamp && (
                    <MessageTimestamp timestamp={message.timestamp} />
                )}
            </div>
        </div>
    );
}

export default Message;
