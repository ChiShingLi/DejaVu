import React from 'react'

import { BsThreeDots } from "react-icons/bs";
import { IoHeartOutline, IoHeart, IoSend, IoChatbubbleOutline, IoShareSocialOutline, IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import "./Feed.css"

const Feed = (props) => {
    return (
        <div className="feed">
            <div className="header">
                <div className="profilePhoto feed-profilePhoto">
                    <img src={props.postData.img} alt="" />
                </div>
                <div className="feed-userDetails">
                    <div className="username">{props.postData.username}</div>
                    <div className="location">{props.postData.location}</div>
                </div>
                <div className="feedOption"><BsThreeDots size={30} /></div>
            </div>
            <div className="feedPhoto">
                <img src={props.postData.img} alt="" />
            </div>
            <div className="feedActions">
                <div className="feedHeart"><IoHeartOutline size={25} /><span>28k Like</span></div>
                <div className="feedComment"><IoChatbubbleOutline size={25} /><span>33 Comment</span></div>
                <div className="feedShare"><IoShareSocialOutline size={25} /><span>123 Share</span></div>
                <div className="feedSave"><IoBookmarkOutline size={25} /><span>10 Saved</span></div>
            </div>
            <hr />
            <div className="feedDescription">
                {props.postData.description}
            </div>
            <div className="feedCommentSection">
                <div className="profilePhoto feed-profilePhoto">
                    <img src={props.postData.img} alt="" />
                </div>
                <div className="commentBox">
                    <input type="text" className="feedCommentInput" placeholder="Write your comment..." maxLength={100} /><span className="send-btn"><IoSend size={30} /></span>
                </div>

            </div>
        </div>
    )
}

export default Feed