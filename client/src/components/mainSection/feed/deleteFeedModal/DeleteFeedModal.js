import React from 'react'
import { Modal, Button } from '@mantine/core';
import { useDispatch } from "react-redux";
import { deleteFeed } from '../../../../redux/actions/feedActions';

import "./DeleteFeedModal.css"
const DeleteFeedModal = ({ deleteFeedModalOpened, setDeleteFeedModalOpened, feedId }) => {
    const dispatch = useDispatch();

    const handleDelete = (feedId) => {
        dispatch(deleteFeed(feedId));
        setDeleteFeedModalOpened(false);
    }

    return (
        <Modal
            //overlayColor={theme === "dark" ? mantineTheme.colors.dark[9] : mantineTheme.colors.gray[2]}
            centered
            size="auto"
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={deleteFeedModalOpened}
            onClose={() => setDeleteFeedModalOpened(false)}
            transitionDuration={300}
            transitionTimingFunction="ease"
            withCloseButton={false}
        >
            <div className="DeleteFeedModal">
                <h2>Are you sure?</h2>
                <div className="deleteFeedModal-btnSelections">
                    <Button color="red" onClick={() => { handleDelete(feedId) }}>Delete</Button>
                    <Button onClick={() => { setDeleteFeedModalOpened(false) }}>Cancel</Button>
                </div>
            </div>
        </Modal >
    )
}

export default DeleteFeedModal