import React, { useContext, useEffect, useState } from 'react';

import Feed from "../feed/Feed";
import { ThemeContext } from '../../../contexts/ThemeContext';
import { API_getAllFeeds } from "../../../apis/FeedRequest";
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch, useSelector } from 'react-redux';
import { Center, SegmentedControl, Box } from '@mantine/core';
import { IoEyeOutline, IoPeopleOutline } from "react-icons/io5";

import "./UserPost.css";
import { fetchAllFeeds } from '../../../redux/actions/feedActions';
const UserPost = ({ }) => {
    const { theme } = useContext(ThemeContext);
    const [loading, setLoading] = useState(true);
    const [selectedFeed, setSelectedFeed] = useState("all");
    const dispatch = useDispatch();
    const postData = useSelector((state) => state.feed.feeds);
    const userDetails = useSelector((state) => state.user);

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

    useEffect(() => {
        //filter posts
        showFollowingFeed();
    }, [selectedFeed]);

    const showFollowingFeed = () => {
        //filter "following" feeds
        const filteredFeed = postData.filter(post => userDetails.following.includes(post.poster));
        return filteredFeed;
    }

    return (
        <div className={theme === "light" ? "userPost" : "userPost-dark"}>
            <div className="userPost-controller">
                <div className="userPost-selector">
                    <SegmentedControl size="md" color="grape"
                        onChange={setSelectedFeed}
                        value={selectedFeed}
                        data={[
                            {
                                value: 'all',
                                label: (
                                    <Center>
                                        <IoEyeOutline size={16} />
                                        <Box ml={10}>All</Box>
                                    </Center>
                                ),
                            },
                            {
                                value: 'following',
                                label: (
                                    <Center>
                                        <IoPeopleOutline size={16} />
                                        <Box ml={10}>Following</Box>
                                    </Center>
                                ),
                            }
                        ]}
                    />
                </div>
            </div>
            {loading ? <PulseLoader size={30} color={"purple"} /> :
                <>
                    {/* {postData.map(post => {
                        return (
                            <Feed postData={post} />
                        )
                    })} */}

                    {selectedFeed === "all" ? postData.map(post => {
                        return (
                            <Feed postData={post} />
                        )
                    }) :
                        showFollowingFeed().map(post => {
                            return (
                                <Feed postData={post} />
                            )
                        })
                    }
                </>}
        </div>
    )
}

export default UserPost;