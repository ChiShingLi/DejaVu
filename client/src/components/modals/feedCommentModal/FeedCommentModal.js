import { Modal, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { API_getFeedComment } from "../../../apis/FeedRequest";
import PulseLoader from "react-spinners/PulseLoader";

import "./FeedCommentModal.css";
import Comment from '../comment/Comment';

function FeedCommentModal({ modalOpened, setModalOpened, feedId }) {
    const theme = useMantineTheme();
    //loading spinner
    const [loading, setLoading] = useState(true);
    const [feedObj, setFeedObj] = useState();

    const getFeedComment = async (feedId) => {
        const result = await API_getFeedComment(feedId);
        if (result.status) {
            setFeedObj(result.feedObj);
            setLoading(false);
        }
    }

    useEffect(() => {
        getFeedComment(feedId)
    }, [modalOpened])

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size={"50%"}
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            <div className="FeedCommentModal">
                {loading ? <PulseLoader size={30} color={"purple"} /> :
                    <>
                        <Comment commentData={feedObj} />
                    </>
                }

            </div>
        </Modal>
    );
}

export default FeedCommentModal;
