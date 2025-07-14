
import { getUserPostComments, getUserCommentReplies, createComment, like, dislike, removeLike, removeDislike } from '../../api/api';
import React, { useState, useEffect } from 'react';


function CommentActionBar({ userId, comment, onReply }) {
    const [likeState, setLikeState] = useState(comment.user_liked || false);
    const [dislikeState, setDislikeState] = useState(comment.user_disliked || false);
    const [replyOpen, setReplyOpen] = useState(false);
    const [replyValue, setReplyValue] = useState('');

    const handleLike = () => {
        if (!likeState) {
            setLikeState(true);
            like(comment.id, userId).catch(() => {
                setLikeState(false);
            });
        }
    };

    const handleDislike = () => {
        if (!dislikeState) {
            setDislikeState(true);
            dislike(comment.id, userId).catch(() => {
                setDislikeState(false);
            });
        }
    };

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
                <button
                    className={`flex items-center gap-1 px-2 py-1 rounded ${likeState ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    onClick={handleLike}
                    aria-label="Like"
                    disabled={likeState}
                >
                    <span role="img" aria-label="like">👍</span>
                    {comment.like_count + (likeState && !comment.user_liked ? 1 : 0)}
                </button>
                <button
                    className={`flex items-center gap-1 px-2 py-1 rounded ${dislikeState ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'}`}
                    onClick={handleDislike}
                    aria-label="Dislike"
                    disabled={dislikeState}
                >
                    <span role="img" aria-label="dislike">👎</span>
                    {comment.dislike_count + (dislikeState && !comment.user_disliked ? 1 : 0)}
                </button>
                <button
                    className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
                    onClick={handleReplyClick}
                    aria-label="Reply"
                >
                    <span role="img" aria-label="reply">💬</span>
                    Reply{typeof comment.reply_count === 'number' ? ` (${comment.reply_count})` : ''}
                </button>
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

const Comment = ({ userId, comment }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState([]);
    const [loadingReplies, setLoadingReplies] = useState(false);

    const handleShowReplies = async () => {
        if (!showReplies && comment.reply_count > 0) {
            setLoadingReplies(true);
            try {
                const fetchedReplies = await getUserCommentReplies(userId, comment.id);
                setReplies(fetchedReplies || []);
            } catch (e) {
                setReplies([]);
            }
            setLoadingReplies(false);
        }
        setShowReplies(!showReplies);
    };

    const handleReply = (replyText) => {
        createComment({ postId: comment.post_id, authorId: userId, parent_id: comment.id, content: replyText })
            .then(newReply => {
                setReplies([...(replies || []), newReply]);
            });
    };

    return (
        <div className="flex border border-gray-300 rounded-md my-2 p-4 bg-white shadow-sm">
            {/* Left: Author profile picture */}
            <div className="flex-shrink-0 mr-4">
                <img
                    src={comment.author_pfp || '/default-profile.png'}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                />
            </div>
            {/* Right: Content */}
            <div className="flex-1 flex flex-col">
                {/* Row 1: Author name and timestamp */}
                <div className="flex items-center gap-2 mb-1 text-sm text-gray-600">
                    <span className="font-semibold">{comment.author_name || "Author" }</span>
                    <span className="text-xs text-gray-400">
                        {comment.created_at ? new Date(comment.created_at).toLocaleString() : ''}
                    </span>
                </div>
                {/* Row 2: Text content */}
                <div className="mb-2 text-gray-800">{comment.content}</div>
                {/* Row 3: Action bar */}
                <CommentActionBar
                    userId={userId}
                    comment={comment}
                    onReply={handleReply}
                />
                {/* Show replies button if there are replies */}
                {comment.reply_count > 0 && (
                    <button
                        className="mt-2 text-blue-600 hover:underline text-sm self-start"
                        onClick={handleShowReplies}
                        disabled={loadingReplies}
                    >
                        {showReplies ? 'Hide Replies' : `Show Replies (${comment.reply_count})`}
                    </button>
                )}
                {/* Replies */}
                {showReplies && (
                    <div className="ml-6 border-l-2 border-gray-200 pl-4 mt-2">
                        {loadingReplies ? (
                            <div className="text-gray-400 text-sm">Loading replies...</div>
                        ) : (
                            replies.map(reply => (
                                <Comment key={reply.id} comment={reply} userId={userId} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

function CommentList({ userId, post }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const response = await getUserPostComments(userId, post.id, 0, 2);
                if (response && response.success) {
                    setComments(response.data || []);
                } else {
                    setComments([]);
                    if (response && response.message) {
                        console.error("Failed to fetch comments:", response.message);
                    }
                }
            } catch (error) {
                setComments([]);
                console.error("Error fetching comments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [userId, post.id]);

    const handleShowMore = async () => {
        setLoading(true);
        try {
            const response = await getUserPostComments(userId, post.id, comments.length, 8);
            if (response && response.success) {
                setComments([...comments, ...(response.data || [])]);
            } else {
                if (response && response.message) {
                    console.error("Failed to fetch more comments:", response.message);
                }
            }
        } catch (error) {
            console.error("Error fetching more comments:", error);
        } finally {
            setLoading(false);
            setShowAll(true);
        }
    };

    return (
        <div>
            {loading && <div className="text-gray-400 text-sm">Loading comments...</div>}
            {!loading && comments.length === 0 && (
                <div className="text-gray-500 text-sm">No comments yet</div>
            )}
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} userId={userId} />
            ))}
            {!showAll && post.comment_count > 2 && comments.length > 0 && (
                <button
                    className="mt-2 text-blue-600 hover:underline text-sm"
                    onClick={handleShowMore}
                    disabled={loading}
                >
                    Show more comments ({post.comment_count - 2})
                </button>
            )}
        </div>
    );
}

export default CommentList;
