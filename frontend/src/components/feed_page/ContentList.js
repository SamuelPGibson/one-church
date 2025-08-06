import React, { useEffect, useState } from "react";
import { getUserFeed } from "../../api/api";
import Post from "./Post";
import Event from "./Event";



export default function ContentList({ userId, user }) {
    const [items, setItems] = useState([]);

    const fetchEvents = async () => {
        try {
            const response = await getUserFeed(userId, 0, 20);
            if (response.success) {
                setItems(response.data);
            } else {
                console.error("Failed to fetch events:", response.message);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-indigo-700 mb-6">Upcoming Events</h1>

            {items.length === 0 ? (
                <p className="text-gray-500">No events available.</p>
            ) : (
                items.map(item => (
                    item.type === "post" ? (
                        <Post key={item.id} userId={userId} user={user} post={item} hideContent={false} />
                    ) : item.type === "event" ? (
                        <Event key={item.id} userId={userId} user={user} event={item} hideContent={false} />
                    ) : (
                        <div key={item.id}>Unknown content type</div>
                    )
                ))
            )}
        </main>
    );
}
