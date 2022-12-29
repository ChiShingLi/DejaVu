import React, { useContext } from 'react'
import { Modal, useMantineTheme } from '@mantine/core';
import moment from 'moment';
import { ThemeContext } from '../../../contexts/ThemeContext';

import "./NewsFeedModal.css";
const NewsFeedModal = ({ newsObj, modalOpened, setModalOpened }) => {
    const mantineTheme = useMantineTheme();
    const { theme } = useContext(ThemeContext);
    return (
        <Modal
            overlayColor={theme === "dark" ? mantineTheme.colors.dark[9] : mantineTheme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size={"80%"}
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            transition="pop-top-right"
            transitionDuration={300}
            transitionTimingFunction="ease"
        >
            <div className="newsFeedModal">
                <div className="title"><h2>{newsObj.title}</h2></div>
                <div className="newsSource">
                    <div className="author">By: {newsObj.source}</div>
                    <div className="publishedDate">{moment(newsObj.published_at).format("YYYY/MM/DD @ HH:MM a")}</div>
                </div>
                <div className="sourceLink">
                    Source: {newsObj.url}
                </div>
                <div className="newsPhoto">
                    <img src={newsObj.image_url} alt={newsObj.source} />
                </div>
                <div className="description">
                    {newsObj.description}
                </div>
            </div>
        </Modal >
    );
}

export default NewsFeedModal;