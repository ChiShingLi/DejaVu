import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_DATABASE_URL });

export const API_postFeed = async (data) => {
    return await API.post("/feed", data,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    ).then((res) => {
        return { status: true, feedObj: res.data.feedObj };
    }).catch((err) => {
        return { status: false, message: err }
    })
};