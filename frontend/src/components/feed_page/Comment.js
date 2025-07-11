// import { getComment, getReplies } from '../../api/api';

import React, { useEffect, useState } from 'react';

const Comment = ({ comment }) => {
    const [likes, setLikes] = useState(comment.likes);
    const [dislikes, setDislikes] = useState(comment.dislikes);
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState([]);

    const handleLike = () => setLikes(likes + 1);
    const handleDislike = () => setDislikes(dislikes + 1);

    const handleShowReplies = async () => {
        if (!showReplies) {
            // const fetchedReplies = await getReplies(comment.id);
            setReplies([]);//fetchedReplies);
        }
        setShowReplies(!showReplies);
    };

    return (
        <div className="border border-gray-300 rounded-md my-2 p-4 bg-white shadow-sm">
            <div className="mb-1 text-sm text-gray-600">
                <strong>Author:</strong> {comment.authorId}
            </div>
            <div className="mb-2 text-gray-800">{comment.content}</div>
            <div className="flex items-center gap-2 mb-2">
                <button
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                    onClick={handleLike}
                >
                    Like ({likes})
                </button>
                <button
                    className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                    onClick={handleDislike}
                >
                    Dislike ({dislikes})
                </button>
                <button
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                    onClick={handleShowReplies}
                >
                    {showReplies ? 'Hide Replies' : 'Show Replies'}
                </button>
            </div>
            {showReplies && (
                <div className="ml-6 border-l-2 border-gray-200 pl-4">
                    {replies.map(reply => (
                        <Comment key={reply.id} comment={reply} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
