import React, { useContext } from 'react'

import { followerData } from "../../testing-data/follower.js";
import { ThemeContext } from '../../contexts/ThemeContext';
import "./FollowerPanel.css"

const FollowerPanel = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <div className={theme === "light" ? "followPanel" : "followPanel-dark"}>
            <h3>Who's following you</h3>
            {followerData.map(follower => {
                return (
                    <div className="followerCard">
                        <div className="followerPhoto"><img src={follower.profileImage} alt="" /></div>
                        <div className="followerDetails">
                            <div className="followerName">{follower.name}</div>
                            <div className="followerUsername">@{follower.username}</div>
                        </div>
                        <button className="button followPanel-follow-btn">Follow</button>
                    </div>
                )
            })}
        </div>
    )
}

export default FollowerPanel