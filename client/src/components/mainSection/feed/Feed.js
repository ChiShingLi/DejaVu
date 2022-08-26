import React, { useContext, useEffect, useState } from 'react'

import { BsThreeDots } from "react-icons/bs";
import { IoHeartOutline, IoHeart, IoSend, IoChatbubbleOutline, IoShareSocialOutline, IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useSelector } from "react-redux";
import { API_getUserFeedDetails } from "../../../apis/UserRequest";
import { API_likeFeed } from "../../../apis/FeedRequest";

import "./Feed.css"
const Feed = (props) => {
    const { theme } = useContext(ThemeContext);
    const { _id, poster, photo, desc, location, likes, shares, comment, saved } = props.postData;
    const userObj = useSelector((state) => state.user);
    const [userDetail, setUserDetail] = useState({
        username: "",
        fullName: "",
        profilePhoto: ""
    });

    const [liked, setLiked] = useState(likes.includes(userObj._id));
    const [likeCount, setLikeCount] = useState(likes.length);

    const handleLike = async (feedId) => {
        const result = await API_likeFeed(feedId);
        if (result.status) {
            setLiked((prev) => !prev);
            liked ? setLikeCount((prev) => prev - 1) : setLikeCount((prev) => prev + 1)
        }
    }

    const getIndividualUser = async (posterId) => {
        const result = await API_getUserFeedDetails(posterId);
        if (result.status === true) {
            setUserDetail(result.userDetails);
        }
    }

    useEffect(() => {
        //get poster details
        getIndividualUser(poster);
    }, [])

    return (
        <div className={theme === "light" ? "feed" : "feed-dark"}>
            <div className="header">
                <div className="profilePhoto feed-profilePhoto">
                    {userDetail.profilePhoto !== null ? <img src={userDetail.profilePhoto} alt="" /> : <img src="/images/noProfilePhoto.jpg" alt="" />}
                </div>
                <div className="feed-userDetails">
                    <div className="username">{userDetail.fullName}</div>
                    <div className="username">@{userDetail.username}</div>
                </div>
                <div className="feedOption"><BsThreeDots size={30} /></div>
            </div>
            <div className="feedPhoto">
                {photo ? <img src={photo} alt="feed" /> : <></>}
            </div>
            <div className="feedActions">
                <div className="feedHeart">{liked ? <IoHeart fill="red" size={25} onClick={() => handleLike(_id)} /> : <IoHeartOutline size={25} onClick={() => handleLike(_id)} />}<span>{likeCount} Like</span></div>
                <div className="feedComment"><IoChatbubbleOutline size={25} /><span>{comment.length} Comment</span></div>
                <div className="feedShare"><IoShareSocialOutline size={25} /><span>{shares.length} Share</span></div>
                <div className="feedSave"><IoBookmarkOutline size={25} /><span>{saved.length} Saved</span></div>
            </div>
            <hr />
            <div className="feedDescription">
                {desc}
            </div>
            <div className="feedCommentSection">
                <div className="profilePhoto feed-profilePhoto">
                    {userObj.profilePhoto ? <img src={userObj.profilePhoto} alt="profile" /> : <img src="/images/noProfilePhoto.jpg" alt="profile" />}
                </div>
                <div className="commentBox">
                    <input type="text" className="feedCommentInput" placeholder="Write your comment..." maxLength={100} /><span className="send-btn"><IoSend size={30} /></span>
                </div>

            </div>
        </div>
    )
}

export default Feed