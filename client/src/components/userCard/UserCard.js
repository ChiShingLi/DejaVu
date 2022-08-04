import React, { useState } from 'react'
import selfie from "../../testing-data/img/profile.jpg"
import { IoLocationOutline, IoSettingsOutline } from "react-icons/io5";
import UserCardModal from '../modals/userCardModal/UserCardModal';

import "./UserCard.css"
const UserCard = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: "Chi Li",
        username: "@Chili",
        title: "Software Engineer",
        location: "Portland, OR"
    });

    //TODO: pass in userDetails state as props to modal


    return (
        <div className="userCard">

            <div className="setting">
                <IoSettingsOutline size={25} onClick={() => setModalOpened(true)} />
                <UserCardModal modalOpened={modalOpened} setModalOpened={setModalOpened} userDetails={userDetails} setUserDetails={setUserDetails} />
            </div>
            <div className="profilePhoto">
                <img src={selfie} alt="test" />
            </div>
            <div className="userDetails">
                <div className="name">{userDetails.name}</div>
                <div className="username">{userDetails.username}</div>
                <div className="title">{userDetails.title}</div>
                <div className="location"><IoLocationOutline />{userDetails.location}</div>
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