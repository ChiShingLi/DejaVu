import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_DATABASE_URL });

//register User API call
export const API_userRegister = async (data) => {
    return await API.post("/user/register", data).then((res) => {
        return { status: true, token: res.data.token, userDetails: res.data.userDetails };
    }).catch((err) => {
        return { status: false, message: err }
    })
};

//user login API call
export const API_userLogin = async (data) => {
    return await API.post("/user/login", data).then((res) => {
        return { status: true, token: res.data.token, userDetails: res.data.userDetails };
    }).catch((err) => {
        return { status: false, message: err }
    })
}

//update userCard
export const API_updateUserCard = async (data) => {
    return await API.patch("/user/updateCard", data,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    ).then((res) => {
        return { status: true, userDetails: res.data.userDetails };
    }).catch((err) => {
        return { status: false, message: err }
    })
}

//get current login user details
export const API_getCurUser = async () => {
    return await API.get("/user", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then((res) => {
        console.log("tEST")
        return { status: true, userDetails: res.data.userDetails };
    }).catch((err) => {
        return { status: false, message: err }
    })
}