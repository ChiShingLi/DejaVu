import React, { useState, useContext } from 'react'
import { IoLocationOutline, IoSettingsOutline } from "react-icons/io5";
import UserCardModal from '../modals/userCardModal/UserCardModal';
import { ThemeContext } from '../../contexts/ThemeContext';

import "./UserCard.css"
const UserCard = () => {
    const { theme } = useContext(ThemeContext);
    const [modalOpened, setModalOpened] = useState(false);
    const [userObj, setUserObj] = useState(JSON.parse(localStorage.getItem("userDetails")));

    return (
        <div className={theme === "light" ? "userCard" : "userCard-dark"}>
            <div className="setting">
                <IoSettingsOutline size={25} onClick={() => setModalOpened(true)} />
                <UserCardModal modalOpened={modalOpened} setModalOpened={setModalOpened} userObj={userObj} setUserObj={setUserObj} />
            </div>
            <div className="profilePhoto">
                {userObj.profilePhoto ? <img src={userObj.profilePhoto} alt="Profile" /> : <img src="/images/noProfilePhoto.jpg" alt="Profile" />}
            </div>
            <div className="userDetails">
                <div className="name">{userObj.fullName}</div>
                <div className="username">@{userObj.username}</div>
                <div className="title">{userObj.title}</div>
                <div className="location"><IoLocationOutline />{userObj.location}</div>
            </div>
            <div className="social-details">
                <div className="postDetail">
                    <div className="postCount">
                        {userObj.feeds.length}
                    </div>
                    <div>POSTS</div>
                </div>
                <div className="followerDetail">
                    <div className="followerCount">
                        {userObj.followers.length}
                    </div>
                    <div>FOLLOWERS</div>
                </div>
                <div className="followingDetail">
                    <div className="followingCount">
                        {userObj.following.length}
                    </div>
                    <div>FOLLOWING</div>
                </div>
            </div>
        </div>
    )
}

export default UserCard