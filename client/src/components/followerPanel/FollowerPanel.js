import React, { useContext } from 'react'

import { followerData } from "../../testing-data/follower.js";
import { ThemeContext } from '../../contexts/ThemeContext';

import "./FollowerPanel.css"
import Follower from './follow/Follower.js';
import { useSelector } from 'react-redux';

const FollowerPanel = () => {
    const { theme } = useContext(ThemeContext)
    const userDetails = useSelector((state) => state.user);

    return (
        <div className={theme === "light" ? "followPanel" : "followPanel-dark"}>
            <h3>Who's following you</h3>
            {userDetails.followers.length > 0 ?
                <>
                    {userDetails.followers.map(follower => {
                        return (
                            <Follower followerId={follower} />
                        )
                    })}
                </> : <>No one is following you yet.</>
            }
        </div>
    )
}

export default FollowerPanel