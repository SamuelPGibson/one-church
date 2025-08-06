import React from 'react';

/**
 * MediaFrame component
 * Displays the image for a post in a styled frame.
 * 
 * Props:
 *   - post: object, expects at least { image_url }
 */
function MediaFrame({ post }) {
    if (!post || !post.image_url) {
        return null;
    }

    return (
        <div className="media-frame w-full max-h-96 mb-3">
            <img
                src={post.image_url}
                alt="Post"
                className="w-full max-h-96 object-cover rounded-md border"
            />
        </div>
    );
}

export default MediaFrame;
