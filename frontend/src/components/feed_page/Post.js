import CommentList from './Comment';
import React, { useState } from 'react';

/**
 * Post structure:
 * 
 * Header - author profile picture, author name, timestamp
 * Caption
 * Image
 * Icons bar - like/displike, comment, share
 *      comment button opens text input for new comment
 * Comments - preview first few comments and button to expand to see all comments
 */

function PostHeader({ userId, post }) {
    return (
        <div className="flex items-center gap-4">
            {/* Author profile picture */}
            <img
                src={post.author_pfp || "https://i.pinimg.com/474x/e6/e4/df/e6e4df26ba752161b9fc6a17321fa286.jpg"}
                alt="Author"
                className="w-12 h-12 rounded-full object-cover"
            />
            {/* Info column (expands) */}
            <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-800 truncate">{post.author_name || "Author"}</div>
                <div className="text-sm text-gray-500">
                    {post.timestamp && (
                        <span>{new Date(post.timestamp).toLocaleString()}</span>
                    )}
                    {post.location && (
                        <span> &middot; {post.location}</span>
                    )}
                </div>
            </div>
            {/* Follow button */}
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Follow
            </button>
        </div>
    );
}

function PostActionBar({ userId, post, onLike, onDislike }) {
    const [likeState, setLikeState] = useState(false);
    const [dislikeState, setDislikeState] = useState(false);
    const [commentOpen, setCommentOpen] = useState(false);

    const handleLike = () => {
        setLikeState(true);
        if (onLike) onLike();
    };

    const handleDislike = () => {
        setDislikeState(true);
        if (onDislike) onDislike();
    };

    const handleCommentClick = () => {
        setCommentOpen(!commentOpen);
        //if (onCommentClick) onCommentClick();
    }

    return (
        <>
        <div className="flex items-center gap-6 mb-4">
            <button
                className={`flex items-center gap-1 px-2 py-1 rounded ${likeState ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={handleLike}
                aria-label="Like"
                >
                <span role="img" aria-label="like">👍</span>
                0
            </button>
            <button
                className={`flex items-center gap-1 px-2 py-1 rounded ${dislikeState ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'}`}
                onClick={handleDislike}
                aria-label="Dislike"
            >
                <span role="img" aria-label="dislike">👎</span>
                0
            </button>
            <button
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
                onClick={handleCommentClick}
                aria-label="Comment"
                >
                <span role="img" aria-label="comment">💬</span>
                Comment
            </button>
            <button
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
                // onClick={onShare} // Implement onShare if needed
                aria-label="Share"
                >
                <span role="img" aria-label="share">🔗</span>
                Share
            </button>
        </div>
        {commentOpen && (
            <div className="w-full mb-4">
                <input
                    type="text"
                    placeholder="Write a comment..."
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                />
                <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
                    Post
                </button>
            </div>
        )}
        </>
    );
}

function Post({ userId, post }) {

    return (
        <div className="post bg-white rounded-lg shadow-md p-6 mb-6">
            <PostHeader userId={userId} post={post} />
            <div className="post-body mb-4">
                <p className="text-gray-800 mb-2">{post.caption}</p>
                {post.image_url && (
                    <img
                        src={post.image_url}
                        alt="Post"
                        className="w-full max-h-96 object-cover rounded-md mb-3"
                    />
                )}
            </div>
            <PostActionBar userId={userId} post={post} />
            <CommentList userId={userId} post={post} />
        </div>
    );
}

export default Post;
