import CommentList from './Comment';
import { PostActionBar } from './ActionBar'; // must have {} for non-default exports
import React, { useState } from 'react';
import UserLink from '../UserLink';
import MediaFrame from './MediaFrame';

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

function PostHeader({ userId, post, showContent, setShowContent, toggleShowContent }) {
    const handleToggleShowContent = () => {
        setShowContent(!showContent);
    };
    
    return (
        <div className="flex items-center gap-4 mb-2">
            {/* Author profile picture */}
            <UserLink 
                userId={post.author_id} 
                showProfilePic={true}
                profilePicUrl={post.author_pfp || "https://i.pinimg.com/474x/e6/e4/df/e6e4df26ba752161b9fc6a17321fa286.jpg"}
                profilePicSize="w-12 h-12"
                className="flex-shrink-0"
            />
            {/* Info column (expands) */}
            <div className="flex-1 min-w-0">
                <UserLink 
                    userId={post.author_id}
                    className="font-semibold text-gray-800 truncate hover:text-indigo-600"
                >
                    {post.author_name || "Author"}
                </UserLink>
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
            {(userId && userId != post.author_id && !toggleShowContent) ? (
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    Follow
                </button>
            ) : null}
            {(toggleShowContent) ? (
                <button className="text-blue-500 hover:text-blue-600" onClick={handleToggleShowContent}>
                    {showContent ? "Hide Content" : "Show Content"}
                </button>
            ) : null}
        </div>
    );
}

function Post({ userId, user, post, hideContent }) {
    const [showContent, setShowContent] = useState(!hideContent);

    return (
        <div className="post bg-white rounded-lg shadow-md p-6 mb-6">
            <PostHeader
                userId={userId}
                post={post}
                showContent={showContent}
                setShowContent={setShowContent}
                toggleShowContent={hideContent}
            />
            <div className="post-body mb-4">
                <p className="text-gray-800 mb-2">{post.caption}</p>
                {showContent && (
                    <MediaFrame post={post} />
                )}
            </div>
            {showContent && (
                <PostActionBar userId={userId} user={user} post={post} />
            )}
            {showContent && (
                <CommentList userId={userId} user={user} post={post} />
            )}
        </div>
    );
}

export default Post;
