import React, { useState, useContext } from 'react'
import { IoLocationOutline, IoSettingsOutline } from "react-icons/io5";
import UserCardModal from '../modals/userCardModal/UserCardModal';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useSelector } from 'react-redux';

import "./UserCard.css"
const UserCard = () => {
    const userDetails = useSelector((state) => state.user);
    const { theme } = useContext(ThemeContext);
    const [modalOpened, setModalOpened] = useState(false);

    return (
        <div className={theme === "light" ? "userCard" : "userCard-dark"}>
            <div className="setting">
                <IoSettingsOutline size={25} onClick={() => setModalOpened(true)} />
                <UserCardModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
            </div>
            <div className="profilePhoto">
                {userDetails.profilePhoto !== null ? <img src={userDetails.profilePhoto} alt="Profile" /> : <img src="/images/noProfilePhoto.jpg" alt="Profile" />}
            </div>
            <div className="userDetails">
                <div className="name">{userDetails.fullName}</div>
                <div className="username">@{userDetails.username}</div>
                <div className="title">{userDetails.title}</div>
                <div className="location"><IoLocationOutline />{userDetails.location}</div>
            </div>
            <div className="social-details">
                <div className="postDetail">
                    <div className="postCount">
                        {userDetails.feeds.length}
                    </div>
                    <div>POSTS</div>
                </div>
                <div className="followerDetail">
                    <div className="followerCount">
                        {userDetails.followers.length}
                    </div>
                    <div>FOLLOWERS</div>
                </div>
                <div className="followingDetail">
                    <div className="followingCount">
                        {userDetails.following.length}
                    </div>
                    <div>FOLLOWING</div>
                </div>
            </div>
        </div>
    )
}

export default UserCard