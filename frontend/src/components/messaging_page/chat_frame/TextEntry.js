import React, { useState } from "react";
import { createChatMessage } from "../../../api/api";

/**
 * TextEntry component for sending messages in a chat.
 * @param {Object} props
 * @param {number} props.chatId - The ID of the chat.
 * @param {number} props.userId - The ID of the user sending the message.
 */
function TextEntry({ chatId, userId }) {
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        setSending(true);
        setError("");
        try {
            const res = await createChatMessage(chatId, userId, message.trim());
            if (res && res.success) {
                setMessage("");
            } else {
                setError(res.error || "Failed to send message.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        }
        setSending(false);
    };

    return (
        <form
            className="flex items-center p-3 border-t bg-white"
            onSubmit={handleSend}
            style={{ position: "sticky", bottom: 0, zIndex: 10 }}
        >
            <input
                type="text"
                className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring"
                placeholder="Type your message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                disabled={sending}
                autoComplete="off"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition disabled:opacity-50"
                disabled={sending || !message.trim()}
            >
                {sending ? "Sending..." : "Send"}
            </button>
            {error && (
                <span className="ml-3 text-sm text-red-500">{error}</span>
            )}
        </form>
    );
}

export default TextEntry;
