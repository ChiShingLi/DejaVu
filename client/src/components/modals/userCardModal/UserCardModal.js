import { Modal, useMantineTheme } from '@mantine/core';
import { useRef } from 'react';

import "./UserCardModal.css";
import selfie from "../../../testing-data/img/profile.jpg"

function UserCardModal({ modalOpened, setModalOpened, userDetails, setUserDetails }) {
    const theme = useMantineTheme();
    const imageRef = useRef();

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
                <div className="PreviewProfilePhoto" onClick={() => imageRef.current.click()}>
                    <img src={selfie} alt="test" />
                </div>
                <input type="file" ref={imageRef} name="ProfilePhotoUpload" style={{ display: "none" }} />
                <input type="text" className="name" placeholder="Name" defaultValue={userDetails.name} />
                <input type="text" className="title" placeholder="Title" defaultValue={userDetails.title} />
                <input type="text" className="location" placeholder="Location" defaultValue={userDetails.location} />
                <button className="button userCardModal-btn">SAVE</button>
            </div>
        </Modal >
    );
}

export default UserCardModal;