import React from 'react';

import "./MainSection.css";
import UserPost from './userPost/UserPost';


const MainSection = () => {
    return (
        <div className="mainSection">
            <UserPost />
        </div>
    )
}

export default MainSection;