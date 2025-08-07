import React, { useEffect, useState } from "react";
import { getChats } from "../../api/api";

// ChatItem component for DMs
function ChatItem({ chat, isSelected, onSelect }) {
    const [imageError, setImageError] = useState(false);
    const [localUnreadCount, setLocalUnreadCount] = useState(chat.unread_count || 0);
    
    const handleClick = () => {
        // Reset unread count to zero when clicked
        setLocalUnreadCount(0);
        onSelect(chat);
    };
    
    return (
        <div
            onClick={handleClick}
            className={`flex items-center p-3 hover:bg-gray-100 rounded transition cursor-pointer ${
                isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            }`}
        >
            <img
                src={imageError ? "/default-pfp.png" : (chat.other_pfp || "/default-pfp.png")}
                alt={chat.other_name}
                className="w-12 h-12 rounded-full object-cover mr-3"
                onError={() => setImageError(true)}
            />
            <div className="flex-1">
                <div className="font-semibold">{chat.other_name}</div>
                {localUnreadCount > 0 && (
                    <span className="text-xs text-white bg-blue-500 rounded-full px-2 py-0.5 ml-1">
                        {localUnreadCount} unread
                    </span>
                )}
            </div>
        </div>
    );
}


// GroupChatItem component for group chats
function GroupChatItem({ chat, isSelected, onSelect }) {
    const [imageError, setImageError] = useState(false);
    const [localUnreadCount, setLocalUnreadCount] = useState(chat.unread_count || 0);
    
    const handleClick = () => {
        // Reset unread count to zero when clicked
        setLocalUnreadCount(0);
        onSelect(chat);
    };
    
    return (
        <div
            onClick={handleClick}
            className={`flex items-center p-3 hover:bg-gray-100 rounded transition cursor-pointer ${
                isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            }`}
        >
            <img
                src={imageError ? "/default-group.png" : (chat.image_url || "/default-group.png")}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover mr-3"
                onError={() => setImageError(true)}
            />
            <div className="flex-1">
                <div className="font-semibold">{chat.name}</div>
                {localUnreadCount > 0 && (
                    <span className="text-xs text-white bg-blue-500 rounded-full px-2 py-0.5 ml-1">
                        {localUnreadCount} unread
                    </span>
                )}
            </div>
        </div>
    );
}

// ChatList component
function ChatList({ userId, selectedChat, onChatSelect }) {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        (async () => {
            try {
                const res = await getChats(userId);
                if (res.success) {
                    setChats(res.data);
                } else {
                    setChats([]);
                }
            } catch (e) {
                setChats([]);
            }
            setLoading(false);
        })();
    }, [userId]);

    const handleChatSelect = (chat) => {
        onChatSelect(chat);
    };

    if (!userId) {
        return <div className="p-4 text-gray-500">Please log in to view your chats.</div>;
    }

    if (loading) {
        return <div className="p-4 text-gray-500">Loading chats...</div>;
    }

    if (chats.length === 0) {
        return <div className="p-4 text-gray-500">No chats found.</div>;
    }

    return (
        <div className="divide-y">
            {chats.map(chat => {
                const isSelected = selectedChat && selectedChat.id === chat.id;
                return chat.type === "group" ? (
                    <GroupChatItem 
                        key={chat.id} 
                        chat={chat} 
                        isSelected={isSelected}
                        onSelect={handleChatSelect}
                    />
                ) : (
                    <ChatItem 
                        key={chat.id} 
                        chat={chat} 
                        isSelected={isSelected}
                        onSelect={handleChatSelect}
                    />
                );
            })}
        </div>
    );
}

export { ChatItem, GroupChatItem, ChatList };

