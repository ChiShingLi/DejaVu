import { Modal, useMantineTheme } from '@mantine/core';
import { useRef, useState } from 'react';

import "./UserCardModal.css";
import selfie from "../../../testing-data/img/profile.jpg"
import { convertImageBase64 } from "../../utilities/ConvertImageBase64"

//TODO: database update logics

function UserCardModal({ modalOpened, setModalOpened, userDetails, setUserDetails }) {
    const theme = useMantineTheme();
    const imageUploadRef = useRef();
    const [image, setImage] = useState();

    const handleImage = async (e) => {
        const imageFile = e.target.files[0];
        const base64Image = await convertImageBase64(imageFile);
        setImage(base64Image);
    }

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            <div className="UserCardModal">
                <h3>My Profile</h3>
                <div className="PreviewProfilePhoto" onClick={() => imageUploadRef.current.click()}>
                    <img src={image} alt="test" />
                </div>
                <input type="file" ref={imageUploadRef} onChange={handleImage} name="ProfilePhotoUpload" style={{ display: "none" }} />
                <input type="text" className="name" placeholder="Name" defaultValue={userDetails.name} />
                <input type="text" className="title" placeholder="Title" defaultValue={userDetails.title} />
                <input type="text" className="location" placeholder="Location" defaultValue={userDetails.location} />
                <button className="button userCardModal-btn">SAVE</button>
            </div>
        </Modal >
    );
}

export default UserCardModal;