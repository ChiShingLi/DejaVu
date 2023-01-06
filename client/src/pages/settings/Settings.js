import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoKeySharp, IoPersonSharp, IoAccessibilitySharp, IoFootstepsSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import PasswordModal from './passwordModal/PasswordModal';
import FollowerModal from './followerModal/FollowerModal';


import "./Settings.css"
import FollowingModal from './followingModal/FollowingModal';
const Settings = () => {
    const navigate = useNavigate();
    const userDetails = useSelector((state) => state.user);
    const [passwordModalOpened, setPasswordModalOpened] = useState(false);
    const [followerModalOpened, setFollowerModalOpened] = useState(false);
    const [followingModalOpened, setFollowingModalOpened] = useState(false);
    return (
        <div className="settings-section">
            <div className="settings-box">
                <div className="settings-title">
                    Settings
                </div>
                <div className="settings-grid">
                    <div className="settings-tile" onClick={() => { navigate(`/profile/${userDetails.username}`) }}>
                        <IoPersonSharp size={50} fill={"rgba(165, 88, 128, 0.8)"} />
                        <div className="tile-description">My Profile</div>
                    </div>
                    <PasswordModal passwordModalOpened={passwordModalOpened} setPasswordModalOpened={setPasswordModalOpened} />
                    <div className="settings-tile" onClick={() => setPasswordModalOpened(true)}>
                        <IoKeySharp size={50} fill={"orange"} />
                        <div className="tile-description">Change Password</div>
                    </div>
                    <FollowerModal followerModalOpened={followerModalOpened} setFollowerModalOpened={setFollowerModalOpened} />
                    <div className="settings-tile" onClick={() => setFollowerModalOpened(true)}>
                        <IoAccessibilitySharp size={50} fill={"purple"} />
                        <div className="tile-description">My Followers</div>
                    </div>
                    <FollowingModal followingModalOpened={followingModalOpened} setFollowingModalOpened={setFollowingModalOpened} />
                    <div className="settings-tile" onClick={() => setFollowingModalOpened(true)}>
                        <IoFootstepsSharp size={50} fill={"rgba(79, 163, 237, 0.8)"} />
                        <div className="tile-description">My Followings</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings