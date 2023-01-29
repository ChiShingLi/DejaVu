import { Modal, useMantineTheme, ScrollArea } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IoHeartOutline, IoHeart, IoSend, IoChatbubbleOutline, IoShareSocialOutline, IoBookmarkOutline, IoBookmark, IoSaveOutline } from "react-icons/io5";
import { showSuccessNoti, showErrorNoti } from '../../../components/utilities/ShowNotification';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import moment from "moment";

import { API_likeFeed, API_commentFeed, API_saveFeed } from '../../../apis/FeedRequest';

import "./ProfileFeedModal.css"
const ProfileFeedModal = ({ feedData, profileUserData, modalOpened, setModalOpened }) => {
    const navigate = useNavigate()
    const userObj = useSelector((state) => state.user);
    const mantineTheme = useMantineTheme();
    const [liked, setLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [commentMessage, setCommentMessage] = useState("");
    const [feedComment, setFeedComment] = useState([]);

    useEffect(() => {
        setFeedComment(feedData.comment);
        checkSocialActions();
    }, [feedData])

    //check if user is already liked the feed
    const checkSocialActions = () => {
        if (feedData.likes !== undefined && feedData.likes.includes(userObj._id)) {
            setLiked(true);
        }
        if (feedData.saved !== undefined && feedData.saved.includes(userObj._id)) {
            setIsSaved(true);
        }
    }

    //handle like/unlike icon rendering
    const handleLike = async (feedId) => {
        const result = await API_likeFeed(feedId);
        if (result.status) {
            setLiked((prev) => !prev);
            if (liked) {
                showSuccessNoti("Feed Unliked!💔", "Unlike feed Successfully.")
            } else {
                showSuccessNoti("Feed Liked!❤️", "Like feed Successfully.")
            }
        }
    }

    // handle save/unsave feed
    const handleSave = async (feedId) => {
        const result = await API_saveFeed(feedId);
        if (result.status) {
            setIsSaved((prev) => !prev);
            if (isSaved) {
                showSuccessNoti("Feed Unsaved", "Unsaved Feed Successfully.")
            } else {
                showSuccessNoti("Feed Saved", "Saved Feed Successfully.")
            }
        } else {
            showErrorNoti("Internal Server Error", "Please try again later...")
        }
    }

    const handleComment = (e) => {
        setCommentMessage(e.target.value);
    }

    const postComment = async () => {
        //make sure the comment message is not empty
        if (commentMessage.trim() !== "") {
            const result = await API_commentFeed(feedData._id, { comment: commentMessage });
            if (result.status) {
                setCommentMessage("");
                setFeedComment([...feedComment, { username: userObj.username, message: commentMessage }]);
                showSuccessNoti("Commented Successfully!");
            } else {
                showErrorNoti("Internal Server Error", "Please try again later.")
            }
        } else {
            setCommentMessage("");
            showErrorNoti("Comment Failed", "Please write down your thoughts or feelings.")
        }
    }

    return (
        <Modal
            //overlayColor={theme === "dark" ? mantineTheme.colors.dark[9] : mantineTheme.colors.gray[2]}
            size="auto"
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            transitionDuration={300}
            transitionTimingFunction="ease"
            withCloseButton={false}
        >
            <div className="profileFeed-UserCardModal">
                <div className="profileFeed-feedPhoto">
                    {feedData.photo !== "" ? <img src={feedData.photo} alt="feed" /> : <div className="profileFeed-feedPhoto-unavailable">Photo Not Available</div>}

                </div>
                <div className="profileFeed-details">
                    <div className="profileFeed-header">
                        <div className="profileFeed-profilePhoto">
                            <img src={profileUserData.profilePhoto} />
                        </div>
                        <div className="profileFeed-userDetails">
                            <div className="profileFeed-fullName">
                                {profileUserData.fullName}
                            </div>
                            <div className="profileFeed-username">
                                @{profileUserData.username}
                            </div>
                        </div>
                    </div>
                    <div className="profileFeed-date">
                        {moment(feedData.createdAt).format("MMM DD, YYYY")}
                    </div>
                    <div className="profileFeed-mobileFeedPhoto" >
                        {feedData.photo !== "" ? <img src={feedData.photo} alt="feed" /> : <div className="profileFeed-feedPhoto-unavailable">Photo Not Available</div>}
                    </div>
                    <div className="profileFeed-body">
                        <div className="profileFeed-description">
                            {feedData.desc}
                        </div>
                    </div>
                    <hr />
                    <ScrollArea style={{ height: 400 }} type="hover" className="profileFeed-commentsSection">
                        {feedComment && feedComment.length > 0 ? feedComment.map(item => {
                            return (
                                <div className="profileFeed-userComments">
                                    <div className="profileFeed-userComments-username" onClick={() => { navigate(`/profile/${item.username}`); navigate(0) }}>
                                        {item.username}:
                                    </div>
                                    <div className="profileFeed-userComments-message">
                                        {item.message}
                                    </div>
                                </div>
                            )
                        }) :
                            <div className="profileFeed-noComments">
                                No comments yet!
                            </div>
                        }
                    </ScrollArea>
                    <hr />
                    <div className="profileFeed-footer">
                        <div className="profileFeed-socialActions">
                            <div className="feedHeart">{liked ? <IoHeart fill="red" size={30} onClick={() => handleLike(feedData._id)} /> : <IoHeartOutline size={30} onClick={() => handleLike(feedData._id)} />}</div>
                            {/* <div className="feedShare"><IoShareSocialOutline size={28} /></div> */}
                            <div className="feedSave">{isSaved ? <IoBookmark fill="orange" size={30} onClick={() => handleSave(feedData._id)} /> : <IoBookmarkOutline size={30} onClick={() => handleSave(feedData._id)} />}</div>
                        </div>
                        <div className="profileFeed-commentBox">
                            <input type="text" className="feedCommentInput" placeholder="Write your comment..." maxLength={100} value={commentMessage} onChange={handleComment} /><span className="send-btn"><IoSend size={25} onClick={postComment} /></span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    );
}

export default ProfileFeedModal