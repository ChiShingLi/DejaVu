import { Modal, useMantineTheme } from '@mantine/core';
import moment from 'moment';
import React from 'react'

import "./NewsFeedModal.css";
const NewsFeedModal = ({ newsObj, modalOpened, setModalOpened }) => {
    const theme = useMantineTheme();
    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size={"80%"}
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            <div className="newsFeedModal">
                <div className="title"><h2>{newsObj.title}</h2></div>
                <div className="newsSource">
                    <div className="author">By: {newsObj.source.name}</div>
                    <div className="publishedDate">{moment(newsObj.publishedAt).format("YYYY/MM/DD @ HH:MM a")}</div>
                </div>
                <div className="newsPhoto">
                    <img src={newsObj.urlToImage} alt={newsObj.source.name} />
                </div>
                <div className="description">
                    {newsObj.description}
                </div>
            </div>
        </Modal >
    );
}

export default NewsFeedModal;