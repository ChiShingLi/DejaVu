import { Modal, useMantineTheme } from '@mantine/core';
import { useRef, useState, useContext } from 'react';

import "./UserCardModal.css";
import { convertImageBase64 } from "../../utilities/ConvertImageBase64"
import { ThemeContext } from '../../../contexts/ThemeContext';
import { API_updateUserCard } from "../../../apis/UserRequest";
import { showSuccessNoti, showErrorNoti } from "../../../components/utilities/ShowNotification";
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from "../../../redux/actions/userActions";

function UserCardModal({ modalOpened, setModalOpened }) {
    //call to redux user store
    const userObj = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const mantineTheme = useMantineTheme();
    const imageUploadRef = useRef();
    const [image, setImage] = useState(userObj.profilePhoto);
    const { theme } = useContext(ThemeContext);
    const [userDetailObj, setUserDetailObj] = useState({
        fullName: userObj.fullName,
        title: userObj.title,
        location: userObj.location,
        profilePhoto: userObj.profilePhoto,
        description: userObj.description
    });


    //convert image into base64
    const handleImage = async (e) => {
        const imageFile = e.target.files[0];
        const base64Image = await convertImageBase64(imageFile);
        setImage(base64Image);
        setUserDetailObj({ ...userDetailObj, profilePhoto: base64Image });
    }

    //handle user inputs
    const handleChange = (e) => {
        setUserDetailObj({ ...userDetailObj, [e.target.name]: e.target.value });
    }

    const handleUpdate = async () => {
        const result = await API_updateUserCard(userDetailObj);
        if (userDetailObj.fullName.trim() === "") {
            showErrorNoti("User Card Update Failed", "Please fill out your name.");
        } else if (result.status === true) {
            showSuccessNoti("User Card Updated Successful", "User Profile Updated");
            setModalOpened(false);
            dispatch(updateUser(userDetailObj));
        } else {
            showErrorNoti("User Card Update Failed", "Please try again later.")
        }
    }

    return (
        <Modal
            overlayColor={theme === "dark" ? mantineTheme.colors.dark[9] : mantineTheme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            transition="slide-right"
            transitionDuration={300}
            transitionTimingFunction="ease"
        >
            <div className="UserCardModal">
                <h3>My Profile</h3>
                <div className="PreviewProfilePhoto" onClick={() => imageUploadRef.current.click()}>
                    {userDetailObj.profilePhoto != null ? <img src={image} alt="Profile" /> : <img src="/images/noProfilePhoto.jpg" alt="Profile" />}
                </div>
                <input type="file" ref={imageUploadRef} onChange={handleImage} name="ProfilePhotoUpload" style={{ display: "none" }} />
                <input type="text" name="fullName" className="name" placeholder="Name" defaultValue={userObj.fullName} onChange={handleChange} />
                <input type="text" name="title" className="title" placeholder="Title" defaultValue={userObj.title} onChange={handleChange} />
                <input type="text" name="location" className="location" placeholder="Location" defaultValue={userObj.location} onChange={handleChange} />
                <textarea type="text" name="description" className="description" placeholder="Description" maxlength="100" defaultValue={userObj.description} onChange={handleChange} />
                <button className="button userCardModal-btn" onClick={handleUpdate}>SAVE</button>
            </div>
        </Modal >
    );
}

export default UserCardModal;