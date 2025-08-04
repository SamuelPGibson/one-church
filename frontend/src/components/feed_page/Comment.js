
import { getUserPostComments, getUserCommentReplies, createComment, getComment, like, dislike, removeLike, removeDislike } from '../../api/api';
import { CommentActionBar } from './ActionBar';
import { useWebSocket } from '../../hooks/useWebSocket';
import React, { useState, useEffect, useCallback } from 'react';


const Comment = ({ userId, comment }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState([]);
    const [loadingReplies, setLoadingReplies] = useState(false);
    const [replyCount, setReplyCount] = useState(comment.reply_count || 0);
    const [visibleReplyCount, setVisibleReplyCount] = useState(0);

    const handleIncomingMessage = useCallback((data) => {
        console.log("Received message:", data);
        if (data.type === 'new_comment') {
          //setComments((prev) => [...prev, data.comment]);
        }
      }, []);

    // for HTTPS use wss://
    useWebSocket(`ws://localhost:8000/ws/replies/${comment.id}/`, handleIncomingMessage);


    const fetchReplies = async () => {
        if (replyCount === replies.length) {
            return;
        }
        if (replies.length === 0) {
            setLoadingReplies(true);
        }
        try {
            // If the user makes a new reply, which is appended to server list
            // the backend might return that reply, not knowing it is already displayed
            const fetchedReplies = await getUserCommentReplies(userId, comment.id, replies.length, 8);
            const newReplies = (fetchedReplies.data || []).filter(
                reply => !replies.some(r => r.id === reply.id)
            );
            setReplies([...replies, ...newReplies]);
            setVisibleReplyCount(replies.length);
        } catch (e) {
            // Optionally handle error
            console.error("Error fetching replies:", e);
        }
        if (loadingReplies) {
            setLoadingReplies(false);
        }
    };

    const handleShowReplies = async () => {
        setShowReplies(!showReplies);

        if (showReplies && replies.length === 0) {
            await fetchReplies();
        }
    };

    const handleReply = async (replyText) => {
        try {
            const resp = await createComment(comment.post_id, userId, comment.id, replyText);
            if (resp && resp.success) {
                setReplyCount(replyCount + 1);
                setReplies([resp.data, ...replies]);
                setVisibleReplyCount(visibleReplyCount + 1);
                if (!showReplies) {
                    setShowReplies(true);
                }
            }
        } catch (error) {
            console.error("Error creating reply:", error);
        }
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
                    replyCount={replyCount}
                    onReply={handleReply}
                />
                {/* Show replies button if there are replies */}
                {replyCount > 0 && (
                    <button
                        className="mt-2 text-blue-600 hover:underline text-sm self-start"
                        onClick={handleShowReplies}
                        disabled={loadingReplies}
                    >
                        {showReplies ? 'Hide Replies' : `Show Replies (${replyCount})`}
                    </button>
                )}
                {/* Replies */}
                {showReplies && (
                    <div className="ml-6 border-l-2 border-gray-200 pl-4 mt-2">
                        {loadingReplies ? (
                            <div className="text-gray-400 text-sm">Loading replies...</div>
                        ) : (
                            <>
                                {replies.map(reply => (
                                    <Comment key={reply.id} comment={reply} userId={userId} />
                                ))}
                                {replyCount > replies.length && (
                                    <button
                                        className="mt-2 text-blue-600 hover:underline text-xs"
                                        onClick={fetchReplies}
                                        disabled={loadingReplies}
                                    >
                                        Show more replies ({replyCount - visibleReplyCount})
                                    </button>
                                )}
                            </>
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
    const [commentCount, setCommentCount] = useState(post.comment_count || 0);
    const [visibleCommentCount, setVisibleCommentCount] = useState(0);

    const fetchComments = async (offset = 0, limit = 2) => {
        setLoading(true);
        try {
            const response = await getUserPostComments(userId, post.id, offset, limit);
            if (response && response.success) {
                // Filter out duplicates
                const newComments = (response.data || []).filter(
                    c => !comments.some(existing => existing.id === c.id)
                );
                setComments(offset === 0 ? newComments : [...comments, ...newComments]);
                setVisibleCommentCount(offset === 0 ? newComments.length : comments.length + newComments.length);
            } else {
                if (offset === 0) setComments([]);
                if (response && response.message) {
                    console.error("Failed to fetch comments:", response.message);
                }
            }
        } catch (error) {
            if (offset === 0) setComments([]);
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCommentCount(post.comment_count || 0);
        fetchComments(0, 2);
    }, [userId, post.id, post.comment_count]);

    const handleShowMore = async () => {
        await fetchComments(comments.length, 8);
        setShowAll(comments.length + 8 >= commentCount);
    };

    const handleNewComment = (newComment) => {
        setComments([newComment, ...comments]);
        setCommentCount(commentCount + 1);
        setVisibleCommentCount(visibleCommentCount + 1);
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
            {!showAll && commentCount > comments.length && comments.length > 0 && (
                <button
                    className="mt-2 text-blue-600 hover:underline text-sm"
                    onClick={handleShowMore}
                    disabled={loading}
                >
                    Show more comments ({commentCount - comments.length})
                </button>
            )}
        </div>
    );
}

export default CommentList;
