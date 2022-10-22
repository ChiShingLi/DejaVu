import React, { useState, useRef } from 'react'
import { Modal, Textarea, Button, Tooltip } from '@mantine/core';
import { convertImageBase64 } from '../../../utilities/ConvertImageBase64';
import { API_editFeed } from '../../../../apis/FeedRequest';
import { showSuccessNoti, showErrorNoti } from '../../../utilities/ShowNotification';
import { editFeed } from '../../../../redux/actions/feedActions';
import { useDispatch } from 'react-redux';

import { IoImageOutline } from "react-icons/io5";
import "./EditFeedModal.css"
const EditFeedModal = ({ editFeedModalOpened, setEditFeedModalOpened, feedData }) => {
    const dispatch = useDispatch();
    const feedImage = useRef();
    const [feedObj, setFeedObj] = useState(feedData);

    const handleChange = (e) => {
        setFeedObj({ ...feedObj, [e.target.name]: e.target.value });
    }

    const handleSubmit = async () => {
        if (feedObj.desc.trim() == "") {
            showErrorNoti("Feed description can not be empty.")
        } else {
            const result = await API_editFeed(feedObj, feedObj._id);
            if (result.status) {
                //console.log(result)
                dispatch(editFeed(result.feedObj))
                showSuccessNoti("Feed Modified", "Edit feed successfully.")
                setEditFeedModalOpened(false);
            } else {
                showErrorNoti("Modify Feed Failed", "Please try again later.")
            }
        }
    }

    //image upload
    const handleImage = async (e) => {
        const imageFile = e.target.files[0];
        const base64Image = await convertImageBase64(imageFile);
        setFeedObj({ ...feedObj, photo: base64Image });
    }

    return (
        <Modal
            //overlayColor={theme === "dark" ? mantineTheme.colors.dark[9] : mantineTheme.colors.gray[2]}
            centered
            size="50%"
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={editFeedModalOpened}
            onClose={() => setEditFeedModalOpened(false)}
            transitionDuration={300}
            transitionTimingFunction="ease"
            withCloseButton={false}
        >
            <div className="editFeedModal">
                <h2>Editing feed</h2>
                <div className="editFeedModal-photo feedPhoto" onClick={() => feedImage.current.click()} >
                    {feedObj.photo != "" ?
                        <Tooltip label="Edit Photo" position="right" withArrow>
                            <img src={feedObj.photo} alt="feed photo" />
                        </Tooltip>
                        :
                        <div className="editFeedModal-noPhoto">
                            <Tooltip label="Add Photo" position="right" withArrow>
                                <div className="noPhotoIcon">
                                    <IoImageOutline size={38} />
                                    <h3>No Feed Photo Available.</h3>
                                </div>
                            </Tooltip>
                        </div>
                    }

                </div>
                <div className="editFeedModal-desc">
                    <Textarea name="desc" withAsterisk placeholder="Description" size="lg" maxLength={100} value={feedObj.desc} onChange={handleChange} />
                    <input type="file" ref={feedImage} accept="image/png, image/gif, image/jpeg" style={{ display: "none" }} onChange={handleImage} />
                </div>
                <div className="editFeedModal-btnSection">
                    <Button variant="gradient" gradient={{ from: "#B0884A", to: "#A046FC" }} size="md" onClick={handleSubmit}>Confirm</Button>
                    <Button onClick={() => setEditFeedModalOpened(false)} size="md">Cancel</Button>
                </div>
            </div>
        </Modal >
    )
}

export default EditFeedModal