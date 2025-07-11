import Comment from './Comment';
import React, { useState } from 'react';

function Post({ userId, post }) {
    const [showComments, setShowComments] = useState(false);

    // Dummy comments array for demonstration; replace with real data as needed
    const comments = post.comments || [];

    return (
        <div className="post bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="post-header flex items-center mb-4">
                <span className="text-gray-700 font-semibold">Author: {post.authorId}</span>
            </div>
            <div className="post-body mb-4">
                {post.imageUrl && (
                    <img
                        src={post.imageUrl}
                        alt="Post"
                        className="w-full max-h-96 object-cover rounded-md mb-3"
                    />
                )}
                <p className="text-gray-800 mb-2">{post.caption}</p>
                <span className="text-sm text-gray-500">Location: {post.location}</span>
            </div>
            <button
                onClick={() => setShowComments(!showComments)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition mb-3"
            >
                {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
            {showComments && (
                <div className="post-comments mt-4 border-t pt-4">
                    {comments.length === 0 ? (
                        <p className="text-gray-500 italic">No comments yet.</p>
                    ) : (
                        comments.map((commentId) => (
                            <Comment key={commentId} commentId={commentId} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Post;
