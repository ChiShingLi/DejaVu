import React from 'react';

import "./MainSection.css";
import PostFeed from './postFeed/PostFeed';
import UserPost from './userPost/UserPost';


const MainSection = () => {
    return (
        <div className="mainSection">
            <PostFeed />
            <UserPost />
        </div>
    )
}

export default MainSection;