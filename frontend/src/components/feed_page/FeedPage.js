import React from 'react';
import ContentList from './ContentList';

const FeedPage = ({ userId, user }) => {
    return (
        <div>
            <ContentList userId={userId} user={user} />
        </div>
    );
};

export default FeedPage;
