import React from 'react';
import ContentList from './ContentList';

const FeedPage = ({ userId }) => {
    return (
        <div>
            <ContentList userId={userId} />
        </div>
    );
};

export default FeedPage;
