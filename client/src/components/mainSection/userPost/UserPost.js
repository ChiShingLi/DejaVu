import React, { useContext } from 'react';

import { postData } from "../../../testing-data/postData"
import Feed from "../feed/Feed";
import { ThemeContext } from '../../../contexts/ThemeContext';

import "./UserPost.css";
const UserPost = ({ }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={theme === "light" ? "userPost" : "userPost-dark"}>
            {postData.map(post => {
                return (
                    <Feed postData={post} />
                )
            })}
        </div>
    )
}

export default UserPost;