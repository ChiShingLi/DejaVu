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
