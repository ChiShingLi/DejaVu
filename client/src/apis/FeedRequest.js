import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_DATABASE_URL });

//user post feed API
export const API_postFeed = async (data) => {
    return await API.post("/feed", data,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then((res) => {
            return { status: true, feedObj: res.data.feedObj };
        }).catch((err) => {
            return { status: false, message: err }
        })
};

//get all users feeds
export const API_getAllFeeds = async () => {
    return await API.get("/feed/all").then((res) => {
        return { status: true, feedObj: res.data.feedObj };
    }).catch((err) => {
        return { status: false, message: err }
    })
};

//like a feed
export const API_likeFeed = async (feedId) => {
    return await API.patch(`/feed/${feedId}`, null,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then((res) => {
            return { status: true, feedObj: res.data.feedObj };
        }).catch((err) => {
            return { status: false, message: err }
        })
}

//comment on feed
export const API_commentFeed = async (feedId, data) => {
    return await API.patch(`feed/comment/${feedId}`, data,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then((res) => {
            return { status: true, feedObj: res.data.feedObj };
        }).catch((err) => {
            return { status: false, message: err }
        })
}

//get feed comments
export const API_getFeedComment = async (feedId) => {
    return await API.get(`/feed/comment/${feedId}`)
        .then((res) => {
            return { status: true, feedObj: res.data.feedObj };
        }).catch((err) => {
            return { status: false, message: err }
        })
}

//save/unsave feed
export const API_saveFeed = async (feedId) => {
    return await API.patch(`/feed/save/${feedId}`, null,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then((res) => {
            return { status: true, message: res.data.message };
        }).catch((err) => {
            return { status: false, message: err }
        })
}