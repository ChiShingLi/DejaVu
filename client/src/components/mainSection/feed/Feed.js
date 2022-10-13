import React, { useContext, useEffect, useState, useRef } from 'react'

import { BsThreeDots } from "react-icons/bs";
import { IoHeartOutline, IoHeart, IoSend, IoChatbubbleOutline, IoShareSocialOutline, IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useDispatch, useSelector } from "react-redux";
import { API_getUserFeedDetails } from "../../../apis/UserRequest";
import { API_likeFeed, API_commentFeed, API_saveFeed } from "../../../apis/FeedRequest";
import { likeUnLikeFeed } from '../../../redux/actions/feedActions';
import FeedCommentModal from "../../modals/feedCommentModal/FeedCommentModal"
import { showSuccessNoti, showErrorNoti } from '../../utilities/ShowNotification';
import { useNavigate } from "react-router-dom";

import "./Feed.css"
const Feed = (props) => {
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const { _id, poster, photo, desc, location, likes, shares, comment, saved } = props.postData;
    const userObj = useSelector((state) => state.user);
    const [userDetail, setUserDetail] = useState({
        username: "",
        fullName: "",
        profilePhoto: ""
    });

    const navigate = useNavigate();
    const commentRef = useRef();
    const [modalOpened, setModalOpened] = useState(false);
    const [liked, setLiked] = useState(likes.includes(userObj._id));
    const [likeCount, setLikeCount] = useState(likes.length);
    const [commentCount, setCommentCount] = useState(comment.length);
    const [commentMessage, setCommentMessage] = useState("");
    const [isSaved, setIsSaved] = useState(saved.includes(userObj._id));
    const [savedCount, setSavedCount] = useState(saved.length);

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
            setCommentMessage("");
        }
    }
    const handleComment = (e) => {
        setCommentMessage(e.target.value);
    }

    //TODO:: testing likes funtion
    // const testingLIkes = (feedId) => {
    //     dispatch(likeUnlikeFeed(feedId));
    // }
    // post comment
    const postComment = async () => {
        //make sure the comment message is not empty
        if (commentMessage.trim() !== "") {
            const result = await API_commentFeed(_id, { comment: commentMessage });
            if (result.status) {
                setCommentCount((prev) => prev + 1);
                setCommentMessage("");
                showSuccessNoti("Commented Successfully!");
            }
        } else {
            setCommentMessage("");
            showErrorNoti("Comment Failed", "Please write down your thoughts or feelings.")
        }
    }

    // handle save/unsave feed
    const handleSave = async (feedId) => {
        const result = await API_saveFeed(feedId);
        if (result.status) {
            setIsSaved((prev) => !prev);
            if (isSaved) {
                setSavedCount((prev) => prev - 1);
                showSuccessNoti("Feed Unsaved", "Unsaved Feed Successfully.")
            } else {
                setSavedCount((prev) => prev + 1);
                showSuccessNoti("Feed Saved", "Saved Feed Successfully.")
            }
        } else {
            showErrorNoti("Internal Server Error", "Please try again later...")
        }
    }

    useEffect(() => {
        //get poster details
        getIndividualUser(poster);
    }, [])

    //TODO: username bug
    return (
        <div className={theme === "light" ? "feed" : "feed-dark"}>
            <div className="header">
                <div className="profilePhoto feed-profilePhoto" onClick={() => { navigate(`/profile/${userDetail.username}`) }}>
                    {userDetail.profilePhoto !== null ? <img src={userDetail.profilePhoto} alt="" /> : <img src="/images/noProfilePhoto.jpg" alt="" />}
                </div>
                <div className="feed-userDetails" onClick={() => { navigate(`/profile/${userDetail.username}`) }}>
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
                <div className="feedComment" onClick={() => setModalOpened(true)}><IoChatbubbleOutline size={25} /><span>{commentCount} Comment</span></div>
                <div className="feedShare"><IoShareSocialOutline size={25} /><span>{shares.length} Share</span></div>
                <div className="feedSave" onClick={() => handleSave(_id)}>{isSaved ? <IoBookmark size={25} fill="orange" /> : <IoBookmarkOutline size={25} />}<span>{savedCount} Saved</span></div>
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
                    <input type="text" ref={commentRef} className="feedCommentInput" placeholder="Write your comment..." maxLength={100} value={commentMessage} onChange={handleComment} /><span className="send-btn"><IoSend size={30} onClick={postComment} /></span>
                    <FeedCommentModal modalOpened={modalOpened} setModalOpened={setModalOpened} feedId={_id} />
                </div>
            </div>
        </div>
    )
}

export default Feed