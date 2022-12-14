import React, { useContext, useRef, useState } from 'react'
import { ThemeContext } from '../../../contexts/ThemeContext';
import { IoImageOutline, IoCloseSharp } from "react-icons/io5";
import { convertImageBase64 } from "../../utilities/ConvertImageBase64"
import { API_postFeed } from "../../../apis/FeedRequest";
import { showSuccessNoti, showErrorNoti } from "../../utilities/ShowNotification";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllFeeds, postFeed, handlePostFeed } from '../../../redux/actions/feedActions';

import "./PostFeed.css";
const PostFeed = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.user);
    const { theme } = useContext(ThemeContext);

    const feedProfilePhoto = userDetails.profilePhoto;
    const feedImage = useRef();
    const [image, setImage] = useState();
    const [feedObj, setFeedObj] = useState({
        desc: "",
        photo: "",
        location: ""
    });


    //image upload
    const handleImage = async (e) => {
        const imageFile = e.target.files[0];
        const base64Image = await convertImageBase64(imageFile);
        setImage(base64Image);
        setFeedObj({ ...feedObj, photo: base64Image });
    }

    //handle user inputs
    const handleChange = (e) => {
        setFeedObj({ ...feedObj, [e.target.name]: e.target.value });
    }

    //clear all user inputs
    const clearAll = () => {
        setImage("");
        setFeedObj({
            desc: "",
            photo: "",
            location: ""
        })
    }

    //post feed to server
    const handleSubmit = async () => {

        if (feedObj.desc.trim() === "") {
            showErrorNoti("Missing Your Thoughts", "Please tell us what's on your mind.");
        }
        else if (feedObj.photo.trim() === "") {
            showErrorNoti("Missing Feed Photo", "Please show us what it's like.");
        }
        else {
            const result = await API_postFeed(feedObj);
            if (result.status) {
                clearAll();
                dispatch(handlePostFeed(result.feedObj, result.feedObj._id));
                showSuccessNoti("Post Feed Successful", "Feed posted.");
            } else {
                showErrorNoti("Internal Server Error", "Please try again later");
            }
        }
    }

    return (
        <div className={theme === "light" ? "postFeed" : "postFeed-dark"}>
            <div className="wrapper">
                <div className="profilePhoto postFeedProfilePhoto">
                    {feedProfilePhoto ? <img src={feedProfilePhoto} alt="feed" /> : <img src="/images/noProfilePhoto.jpg" alt="feed" />}
                </div>
                <div className="postFeedInput">
                    <div className="feedInputWrapper">
                        <input type="text" name="desc" placeholder="What's on your mind?" maxLength={100} value={feedObj.desc} onChange={handleChange} />
                        <IoImageOutline className="imageIcon" size={45} onClick={() => feedImage.current.click()} />
                    </div>
                    <button className="button shareFeed-btn" onClick={handleSubmit}>Share</button>
                    <input type="file" ref={feedImage} accept="image/png, image/gif, image/jpeg" style={{ display: "none" }} onChange={handleImage} />
                </div>
            </div>
            {image ?
                <div className="FeedImagePreview">
                    <div className="cancelButton">
                        <IoCloseSharp className="cancelIcon" size={40} onClick={() => setImage(null)} />
                    </div>
                    <img src={image} alt="feed" />
                </div> : <></>}
        </div>
    )
}

export default PostFeed;