import React from 'react';

import "./UserPost.css";
import { postData } from "../../../testing-data/postData"
import Feed from "../feed/Feed";

const UserPost = ({ }) => {
    return (
        <div className="userPost">
            {postData.map(post => {
                return (
                    <Feed postData={post} />
                )
            })}
        </div>
    )
}

export default UserPost;