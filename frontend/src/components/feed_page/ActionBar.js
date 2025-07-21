import React, { useState } from 'react';

import { like, dislike, removeLike, removeDislike } from '../../api/api';
import { goingEvent, removeGoingEvent, interestedEvent, removeInterestedEvent } from '../../api/api';


function LikeButtons({ userId, item }) {
    const [likeState, setLikeState] = useState(item.user_liked || false);
    const [dislikeState, setDislikeState] = useState(item.user_disliked || false);

    const handleLike = async () => {
        if (!likeState) {
            setLikeState(true);
            const res = await like(item.id, userId);
            if (!res || res.success === false) {
                setLikeState(false);
            }
            if (dislikeState) {
                setDislikeState(false);
                await removeDislike(item.id, userId);
            }
        } else {
            setLikeState(false);
            const res = await removeLike(item.id, userId);
            if (!res || res.success === false) {
                setLikeState(true);
            }
        }
    };

    const handleDislike = async () => {
        if (!dislikeState) {
            setDislikeState(true);
            const res = await dislike(item.id, userId);
            if (!res || res.success === false) {
                setDislikeState(false);
            }
            if (likeState) {
                setLikeState(false);
                await removeLike(item.id, userId);
            }
        } else {
            setDislikeState(false);
            const res = await removeDislike(item.id, userId);
            if (!res || res.success === false) {
                console.log("Failed to remove dislike");
                setDislikeState(true);
            }
        }
    };

    return (
        <>
            <button
                className={`flex items-center gap-1 px-2 py-1 rounded ${likeState ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={handleLike}
                aria-label="Like"
                disabled={likeState}
            >
                <span role="img" aria-label="like">👍</span>
                {item.like_count + (likeState && !item.user_liked ? 1 : 0)}
            </button>
            <button
                className={`flex items-center gap-1 px-2 py-1 rounded ${dislikeState ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'}`}
                onClick={handleDislike}
                aria-label="Dislike"
                disabled={dislikeState}
            >
                <span role="img" aria-label="dislike">👎</span>
                {item.dislike_count + (dislikeState && !item.user_disliked ? 1 : 0)}
            </button>
        </>
    )
}

function GoingButtons({ userId, event }) {
    const [goingState, setGoingState] = useState(event.user_going || false);
    const [interestedState, setInterestedState] = useState(event.user_interested || false);

    const handleGoing = async () => {
        if (!goingState) {
            setGoingState(true);
            const res = await goingEvent(event.id, userId);
            if (!res || res.success === false) {
                setGoingState(false);
            }
            if (interestedState) {
                setInterestedState(false);
                await removeInterestedEvent(event.id, userId);
            }
        } else {
            setGoingState(false);
            const res = await removeGoingEvent(event.id, userId);
            if (!res || res.success === false) {
                setGoingState(true);
            }
        }
    };

    const handleInterested = async () => {
        if (!interestedState) {
            setInterestedState(true);
            const res = await interestedEvent(event.id, userId);
            if (!res || res.success === false) {
                setInterestedState(false);
            }
            if (goingState) {
                setGoingState(false);
                await removeGoingEvent(event.id, userId);
            }
        } else {
            setInterestedState(false);
            const res = await removeInterestedEvent(event.id, userId);
            if (!res || res.success === false) {
                setInterestedState(true);
            }
        }
    };

    return (
        <>
            <button
                className={`flex items-center gap-1 px-2 py-1 rounded ${goingState ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
                onClick={handleGoing}
                aria-label="Going"
                disabled={goingState}
            >
                <span role="img" aria-label="going">✅</span>
                Going{typeof event.going_count === 'number' ? ` (${event.going_count + (goingState && !event.user_going ? 1 : 0)})` : ''}
            </button>
            <button
                className={`flex items-center gap-1 px-2 py-1 rounded ${interestedState ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100'}`}
                onClick={handleInterested}
                aria-label="Interested"
                disabled={interestedState}
            >
                <span role="img" aria-label="interested">⭐</span>
                Interested{typeof event.interested_count === 'number' ? ` (${event.interested_count + (interestedState && !event.user_interested ? 1 : 0)})` : ''}
            </button>
        </>
    );
}

function CommentActionBar({ userId, comment, replyCount, onReply }) {
    const [replyOpen, setReplyOpen] = useState(false);
    const [replyValue, setReplyValue] = useState('');

    const handleReplyClick = () => {
        setReplyOpen(!replyOpen);
    };

    const handleSendReply = () => {
        if (onReply && replyValue.trim()) {
            onReply(replyValue);
            setReplyValue('');
            setReplyOpen(false);
        }
    };

    return (
        <>
            <div className="flex items-center gap-6 mb-2">
                <LikeButtons userId={userId} item={comment} />
                {/* Show reply button only if parent_id is 0 (to forbid nested replies) */}
                {comment.parent_id === 0 && (
                    <button
                        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
                        onClick={handleReplyClick}
                        aria-label="Reply"
                    >
                    <span role="img" aria-label="reply">💬</span>
                    Reply{typeof replyCount === 'number' ? ` (${replyCount})` : ''}
                </button>
                )}
            </div>
            {replyOpen && (
                <div className="w-full mb-2 flex gap-2">
                    <input
                        type="text"
                        placeholder="Write a reply..."
                        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
                        value={replyValue}
                        onChange={e => setReplyValue(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                        onClick={handleSendReply}
                    >
                        Send
                    </button>
                </div>
            )}
        </>
    );
}

function PostActionBar({ userId, post, onLike, onDislike }) {
    const [commentOpen, setCommentOpen] = useState(false);

    const handleCommentClick = () => {
        setCommentOpen(!commentOpen);
        //if (onCommentClick) onCommentClick();
    }

    return (
        <>
        <div className="flex items-center gap-6 mb-4">
            <LikeButtons userId={userId} item={post} />
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

function EventActionBar({ userId, event }) {
    const [commentOpen, setCommentOpen] = useState(false);

    const handleCommentClick = () => {
        setCommentOpen(!commentOpen);
    };

    return (
        <>
            <div className="flex items-center gap-6 mb-4">
                <LikeButtons userId={userId} item={event} />
                <GoingButtons userId={userId} event={event} />
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

export { CommentActionBar, PostActionBar, EventActionBar };
