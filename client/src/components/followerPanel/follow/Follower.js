import React, { useState, useEffect } from 'react'
import { API_followUser, API_getUserFeedDetails } from "../../../apis/UserRequest";
import { showSuccessNoti, showErrorNoti } from '../../utilities/ShowNotification.js';
import { useSelector, useDispatch } from 'react-redux';
import { addFollower, removeFollower } from '../../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mantine/core';

import "./Follower.css"
const Follower = ({ followerId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const [followerObj, setFollowerObj] = useState({
    fullname: "",
    username: "",
    profilePhoto: ""
  });

  // check if the user is following their followers
  const [isFollowing, setIsFollowing] = useState(userDetails.following.includes(followerId));


  useEffect(() => {
    //get follower details
    getFollowerDetails(followerId);
  }, [])

  //get follower details
  const getFollowerDetails = async (followerId) => {
    const result = await API_getUserFeedDetails(followerId)
    if (result.status) {
      setFollowerObj({ ...followerObj, fullname: result.userDetails.fullName, username: result.userDetails.username, profilePhoto: result.userDetails.profilePhoto });
    }
  }

  const handleFollow = async () => {
    if (userDetails.following.includes(followerId)) {
      const result = await API_followUser(followerId);
      if (result.status) {
        setFollowerObj({ ...followerObj, isFollower: false })
        //remove follower action
        dispatch(removeFollower(followerId))
        showSuccessNoti("Unfollow Successfully!", `Unfollowed ${followerObj.fullname}.`)
        setIsFollowing(false);
      }
    } else {
      const result = await API_followUser(followerId);
      if (result.status) {
        setFollowerObj({ ...followerObj, isFollower: true })
        //add follower action
        dispatch(addFollower(followerId))
        showSuccessNoti("Follow Successfully!", `Following ${followerObj.fullname}.`)
        setIsFollowing(true);
      }
    }
  }

  return (
    <div className="followerCard">
      <Tooltip label="View Profile" position="left" withArrow>
        <div className="followerPhoto" onClick={() => { navigate(`/profile/${followerObj.username}`) }}>{followerObj.profilePhoto !== null ? <img src={followerObj.profilePhoto} alt="Follower Profile" /> : <img src="/images/noProfilePhoto.jpg" alt="Follower Profile" />}</div>
      </Tooltip>
      <div className="followerDetails" onClick={() => { navigate(`/profile/${followerObj.username}`) }}>

        <div className="followerName">{followerObj.fullname}</div>
        <div className="followerUsername">@{followerObj.username}</div>
      </div>
      <button className="button followPanel-follow-btn" onClick={handleFollow}>{isFollowing ? "Unfollow" : "Follow"}</button>
    </div >
  )
}

export default Follower