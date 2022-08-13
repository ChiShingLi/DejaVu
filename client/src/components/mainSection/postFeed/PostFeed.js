import React, { useContext, useRef, useState } from 'react'
import { ThemeContext } from '../../../contexts/ThemeContext';
import selfie from "../../../testing-data/img/profile.jpg"
import { IoImageOutline, IoCloseSharp } from "react-icons/io5";
import { convertImageBase64 } from "../../utilities/ConvertImageBase64"

import "./PostFeed.css";
const PostFeed = () => {
    const { theme } = useContext(ThemeContext);
    const feedImage = useRef();
    const [image, setImage] = useState();

    //image upload
    const handleImage = async (e) => {
        const imageFile = e.target.files[0];
        const base64Image = await convertImageBase64(imageFile);
        setImage(base64Image);
    }

    return (
        <div className={theme === "light" ? "postFeed" : "postFeed-dark"}>
            <div className="wrapper">
                <div className="profilePhoto postFeedProfilePhoto">
                    <img src={selfie} alt="test" />
                </div>
                <div className="postFeedInput">
                    <div className="feedInputWrapper">
                        <input type="text" placeholder="What's on your mind?" maxLength={100} />
                        <IoImageOutline className="imageIcon" size={38} onClick={() => feedImage.current.click()} />
                    </div>
                    <button className="button shareFeed-btn">Share</button>
                    <input type="file" ref={feedImage} style={{ display: "none" }} onChange={handleImage} />
                </div>
            </div>
            {image ?
                <div className="FeedImagePreview">
                    <div className="cancelButton"><IoCloseSharp className="cancelIcon" size={40} onClick={() => setImage(null)} /></div>
                    <img src={image} alt="" />
                </div> : <></>}
        </div>
    )
}

export default PostFeed;