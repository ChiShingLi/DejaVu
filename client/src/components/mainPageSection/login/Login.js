import React, { useState, useContext } from 'react'
import { ThemeContext } from '../../../contexts/ThemeContext';
import { API_userLogin } from "../../../apis/UserRequest";
import { showErrorNoti } from '../../utilities/ShowNotification';
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import "./Login.css";
const Login = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    //loading spinner indicator
    const [loading, setLoading] = useState(false);
    const [loginObj, setLoginObj] = useState({
        username: "",
        password: ""
    });

    //user login details object
    const handleChange = (e) => {
        setLoginObj({ ...loginObj, [e.target.name]: e.target.value })
    }

    //handle submit button click
    const handleSubmit = async () => {
        setLoading(true);
        const result = await API_userLogin(loginObj);
        if (result.status === true) {
            localStorage.setItem("token", result.token);
            navigate("/home");
            setLoading(false);
        } else if (result.status === false) {
            console.log(result);
            { result.message.response.status === 401 ? showErrorNoti("Incorrect Username or Password", "Please try again.") : showErrorNoti("Internal Server Error", "Please try again.") }
        }
        setLoading(false);
    }

    return (
        <div className={theme === "light" ? "loginSection" : "loginSection-dark"}>
            <h1>Sign In</h1>
            <input type="text" name="username" className="loginInput" placeholder="Username" onChange={handleChange} />
            <input type="password" name="password" className="loginInput" placeholder="Password" onChange={handleChange} />
            <button className="button login-btn" onClick={handleSubmit}>{loading ? <PulseLoader size={10} color={"white"} /> : "Log In"}</button>
        </div>
    )
}

export default Login