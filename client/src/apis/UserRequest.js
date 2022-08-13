import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_DATABASE_URL });

//register User API call
export const API_userRegister = async (data) => {
    return await API.post("/user/register", data).then((res) => {
        return { status: true, token: res.data.token };
    }).catch((err) => {
        return { status: false, message: err }
    })
};
