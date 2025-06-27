import React, { useEffect, useState } from "react";
import Search from "./Search";

function Home() {
    const [currentUser, setCurrentUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [feed, setFeed] = useState([]);

    // Simulate logged-in user (id: 1 for now)
    const currentUserId = 1;

    useEffect(() => {
        // Fetch all users and posts
        Promise.all([
            fetch("http://localhost:3001/users").then((res) => res.json()),
            fetch("http://localhost:3001/posts").then((res) => res.json())
        ]).then(([users, posts]) => {
            setAllUsers(users);
            setPosts(posts);

            const user = users.find((u) => u.id === currentUserId);
            setCurrentUser(user);

            const feedPosts = posts.filter((post) =>
                user.following.includes(post.userId)
            );

            setFeed(feedPosts.reverse()); // newest first
        });
    }, []);

    const getUserById = (id) => allUsers.find((u) => u.id === id);

    return (
        <main className="container mx-auto px-6 py-12 max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 text-indigo-700">About OneChurch</h1>
            <p className="text-lg text-gray-800 leading-relaxed mb-10">
                A social networking platform for the Body of Christ to connect with each other across the globe.
            </p>

            <Search users={allUsers} />


            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Feed</h2>

            {feed.length === 0 ? (
                <p className="text-gray-500">You're not following anyone yet. Follow others to see their posts here.</p>
            ) : (
                feed.map((post) => {
                    const user = getUserById(post.userId);
                    return (
                        <div
                            key={post.id}
                            className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200"
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src={user.profilePicture}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full mr-4 object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-indigo-700">{user.name}</p>
                                    <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                            <p className="text-gray-800 mb-3">{post.content}</p>
                            {post.image && (
                                <img
                                    src={post.image}
                                    alt="Post"
                                    className="rounded-lg w-full max-h-80 object-cover mb-2"
                                />
                            )}
                            <p className="text-sm text-gray-500">
                                ❤️ {post.likes.length} like{post.likes.length !== 1 && "s"}
                            </p>
                        </div>
                    );
                })
            )}
        </main>
    );
}

export default Home;
