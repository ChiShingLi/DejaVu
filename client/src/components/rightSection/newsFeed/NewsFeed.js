import React, { useState, useContext } from 'react'
import moment from "moment";
import NewsFeedModal from '../../modals/newsFeedModal/NewsFeedModal';
import { ThemeContext } from '../../../contexts/ThemeContext';

import "./NewsFeed.css"
const NewsFeed = (props) => {
    const { newsObj } = props;
    const dateFromNow = moment(newsObj.publishedAt).fromNow();
    const [modalOpened, setModalOpened] = useState(false);
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div className={theme === "light" ? "newsFeed" : "newsFeed-dark"} >
            <NewsFeedModal newsObj={newsObj} modalOpened={modalOpened} setModalOpened={setModalOpened} />
            <div className="header">
                <div className="newsSource">{newsObj.source.name}</div>
                <div className="date">| {dateFromNow}</div>
            </div>
            <div className="newsFeedDetails" onClick={() => setModalOpened(true)}>
                <div className="headline">{newsObj.title}</div>
                <div className="newsFeedImage">
                    <img src={newsObj.urlToImage} alt="News Feed Image" />
                </div>
            </div>
        </div>
    )
}

export default NewsFeed;