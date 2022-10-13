import React, { useEffect, useState } from 'react'
import { API_getUserProfile } from '../../apis/UserRequest';
import { showErrorNoti } from '../../components/utilities/ShowNotification';
import ProfileFeedCard from './profileFeedCard/ProfileFeedCard';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import "./Profile.css";
const Profile = () => {
    const navigate = useNavigate();
    const params = useParams();
    const userObj = useSelector((state) => state.user);

    const [profileObj, setProfileObj] = useState({
        username: "null",
        fullName: "null",
        profilePhoto: null,
        feeds: [],
        followers: [],
        following: [],
        location: null,
        profileDescription: null
    });

    const getUserProfile = async () => {
        const result = await API_getUserProfile(params.username);
        if (result.status) {
            setProfileObj(result.userDetails);
        } else {
            showErrorNoti("Error loading user profile", "Please try again.");
            navigate("/home");
        }
    }

    useEffect(() => {
        getUserProfile();
    }, [])

    return (
        <div className="profile">
            <div className="profile-header">
                <div className="profile-profilePhoto">
                    <div className="profile-profilePhoto">
                        {profileObj.profilePhoto !== null ? <img src={profileObj.profilePhoto} alt="Profile" /> : <img src="/images/noProfilePhoto.jpg" alt="Profile" />}
                    </div>
                </div>
                <div className="profile-profileDesc">
                    <div className="profile-profileDesc-Header">
                        <div className="profile-username">{profileObj.fullName}</div>
                        <div className="profile-followBtn">
                            {userObj && userObj.username == params.username ? <></> :
                                <button className="button profile-follow-btn">Follow</button>}
                        </div>
                    </div>
                    <div className="social-details">
                        <div className="postDetail">
                            <div className="postCount">
                                {profileObj.feeds.length}
                            </div>
                            <div>POSTS</div>
                        </div>
                        <div className="followerDetail">
                            <div className="followerCount">
                                {profileObj.followers.length}
                            </div>
                            <div>FOLLOWERS</div>
                        </div>
                        <div className="followingDetail">
                            <div className="followingCount">
                                {profileObj.following.length}
                            </div>
                            <div>FOLLOWING</div>
                        </div>
                    </div>
                    {/* <div className="profile-location">
                        {profileObj.location}
                    </div> */}
                    <div className="profile-desc">
                        {profileObj.description}
                    </div>
                </div>
            </div>
            <div className="profile-feedSection">
                <div className="profile-feedGrid">
                    {profileObj.feeds.map(feed => {
                        return (
                            <ProfileFeedCard feedId={feed} profileUserObj={profileObj} />
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Profile