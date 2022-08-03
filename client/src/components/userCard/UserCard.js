import React from 'react'
import selfie from "../../testing-data/img/profile.jpg"
import { IoLocationOutline, IoSettingsOutline } from "react-icons/io5";

import "./UserCard.css"
const UserCard = () => {
    return (
        <div className="userCard">
            <div className="setting"><IoSettingsOutline size={25} /></div>
            <div className="profilePhoto">
                <img src={selfie} alt="test" />
            </div>
            <div className="userDetails">
                <div className="name">Chi Li</div>
                <div className="username">@Chili</div>
                <div className="title">Software Engineer</div>
                <div className="location"><IoLocationOutline />Portland, OR</div>
            </div>
            <div className="social-details">
                <div className="postDetail">
                    <div className="postCount">
                        1,000
                    </div>
                    <div>POSTS</div>
                </div>
                <div className="followerDetail">
                    <div className="followerCount">
                        2,000
                    </div>
                    <div>FOLLOWERS</div>
                </div>
                <div className="followingDetail">
                    <div className="followingCount">
                        3,000
                    </div>
                    <div>FOLLOWING</div>
                </div>
            </div>
        </div>
    )
}

export default UserCard