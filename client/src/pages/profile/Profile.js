import React, { useEffect, useState } from 'react'
import { API_getUserProfile, API_followUser } from '../../apis/UserRequest';
import { showSuccessNoti, showErrorNoti } from '../../components/utilities/ShowNotification';
import ProfileFeedCard from './profileFeedCard/ProfileFeedCard';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addFollower, removeFollower } from '../../redux/actions/userActions';

import "./Profile.css";
const Profile = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const userObj = useSelector((state) => state.user);
    const [isFollowing, setIsFollowing] = useState(false);

    const [profileObj, setProfileObj] = useState({
        _id: null,
        username: "null",
        fullName: "null",
        profilePhoto: null,
        feeds: [],
        followers: [],
        following: [],
        location: null,
        profileDescription: null
    });


    useEffect(() => {
        getUserProfile();
    }, [])

    const getUserProfile = async () => {
        const result = await API_getUserProfile(params.username);
        if (result.status) {
            setProfileObj(result.userDetails);
            //check if user is following the current profile user
            if (userObj && userObj.following.includes(result.userDetails._id)) {
                setIsFollowing(true);
            }
        } else {
            showErrorNoti("Error loading user profile", "Please try again.");
            navigate("/home");
        }
    }

    //return follow button text based on 'isFollowing' status
    const followBtn = () => {
        if (isFollowing) {
            return <button className="button profile-follow-btn" onClick={() => handleFollow(profileObj._id)}>Unfollow</button>;
        }
        return <button className="button profile-follow-btn" onClick={() => handleFollow(profileObj._id)}>Follow</button>;
    }

    const handleFollow = async (followerId) => {
        if (userObj.following.includes(followerId)) {
            const result = await API_followUser(followerId);
            if (result.status) {
                setIsFollowing(false);
                //remove follower action
                dispatch(removeFollower(followerId))
                showSuccessNoti("Unfollow Successfully!", `Unfollowed ${profileObj.fullName}.`)
                setIsFollowing(false);
            }
        } else {
            const result = await API_followUser(followerId);
            if (result.status) {
                setIsFollowing(true)
                //add follower action
                dispatch(addFollower(followerId))
                showSuccessNoti("Follow Successfully!", `Following ${profileObj.fullName}.`)
                setIsFollowing(true);
            }
        }
    }


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
                                followBtn()
                            }
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