import React, { useContext, useEffect, useState } from 'react';

import Feed from "../feed/Feed";
import { ThemeContext } from '../../../contexts/ThemeContext';
import { API_getAllFeeds } from "../../../apis/FeedRequest";
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch, useSelector } from 'react-redux';

import "./UserPost.css";
import { fetchAllFeeds } from '../../../redux/actions/feedActions';
const UserPost = ({ }) => {
    const { theme } = useContext(ThemeContext);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const postData = useSelector((state) => state.feed.feeds);

    //sort feed in descending order (recent feeds)
    const sortByDate = () => {
        postData.sort((a, b) => {
            const aTime = a.createdAt;
            const bTime = b.createdAt;
            if (aTime < bTime) {
                return 1;
            }
            if (aTime > bTime) {
                return -1;
            }
        });
    }

    useEffect(() => {
        dispatch(fetchAllFeeds());
        setLoading(false);
    }, []);

    return (
        <div className={theme === "light" ? "userPost" : "userPost-dark"}>
            {loading ? <PulseLoader size={30} color={"purple"} /> :
                <>
                    {sortByDate(postData)}
                    {postData.map(post => {
                        return (
                            <Feed postData={post} />
                        )
                    })}
                </>}
        </div>
    )
}

export default UserPost;