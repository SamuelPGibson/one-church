import React, { useState, useEffect, useCallback } from "react";
import { getChatMessages, createChatMessage } from "../../../api/api";
import { useWebSocket } from "../../../hooks/useWebSocket";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import TextEntry from "./TextEntry";

/**
 * ChatFrame component - Main chat interface
 * @param {Object} props
 * @param {number} props.userId - Current user ID
 * @param {Object} props.chat - Chat data (optional, will fetch if not provided)
 * @param {number} props.chatId - Chat ID (optional, can be passed directly)
 */
function ChatFrame({ userId, chat, chatId }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chatInfo, setChatInfo] = useState(chat || null);
    const [error, setError] = useState("");

    // Use chatId from props or from chat object
    const currentChatId = chatId || chat?.id;

    // WebSocket for real-time messages
    const handleIncomingMessage = useCallback((data) => {
        if (data.type === 'new_message' && data.message.chat_id === parseInt(currentChatId)) {
            setMessages(prev => [...prev, data.message]);
        }
    }, [currentChatId]);

    // Always call useWebSocket, but pass null URL if no chatId
    const wsUrl = currentChatId ? `ws://localhost:8000/ws/chat/${currentChatId}/` : null;
    useWebSocket(wsUrl, handleIncomingMessage);

    // Fetch chat messages
    const fetchMessages = async () => {
        if (!currentChatId) return;
        
        try {
            setLoading(true);
            const res = await getChatMessages(parseInt(currentChatId), messages.length, 20);
            console.log("RES", res);
            if (res.success) {
                setMessages(prev => [...prev, ...(res.data || [])]);
            } else {
                setError(res.error || "Failed to load messages");
            }
        } catch (err) {
            setError("Network error loading messages");
        } finally {
            setLoading(false);
        }
    };

    // Update chat info when chat prop changes
    useEffect(() => {
        setChatInfo(chat || null);
    }, [chat]);

    useEffect(() => {
        console.log("NEW currentChatId", currentChatId);
        if (currentChatId) {
            console.log("FETCHING MESSAGES");
            fetchMessages();
        } else {
            setMessages([]);
            setLoading(false);
            setError("");
        }
    }, [currentChatId]);

    if (!currentChatId) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-500">
                    <h3 className="text-lg font-medium mb-2">Select a chat</h3>
                    <p>Choose a conversation from the list to start messaging</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white">
            <ChatHeader 
                chatId={parseInt(currentChatId)} 
                chatInfo={chatInfo}
                onChatInfoUpdate={setChatInfo}
            />
            
            <div className="flex-1 flex flex-col min-h-0">
                <MessageList 
                    chat={chatInfo}
                    messages={messages}
                    loading={loading}
                    error={error}
                    userId={userId}
                    onLoadMore={() => fetchMessages(messages.length)}
                    hasMore={messages.length >= 20} // Simple pagination check
                />
                
                <TextEntry 
                    chatId={parseInt(currentChatId)}
                    userId={userId}
                />
            </div>
        </div>
    );
}

export default ChatFrame;
