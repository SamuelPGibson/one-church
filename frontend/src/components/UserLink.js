import React from 'react';
import { Link } from 'react-router-dom';

const UserLink = ({ userId, children, className = "", showProfilePic = false, profilePicUrl = "", profilePicSize = "w-12 h-12" }) => {
    if (!userId) {
        return <span className={className}>{children}</span>;
    }

    return (
        <Link 
            to={`/profile/${userId}`} 
            className={`hover:opacity-80 transition-opacity ${className}`}
        >
            {showProfilePic && profilePicUrl && (
                <img
                    src={profilePicUrl}
                    alt="Profile"
                    className={`${profilePicSize} rounded-full object-cover`}
                    onError={(e) => {
                        e.target.src = "/default-pfp.png";
                    }}
                />
            )}
            {children}
        </Link>
    );
};

export default UserLink; 