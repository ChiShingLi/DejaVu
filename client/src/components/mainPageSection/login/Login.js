import React, { useState, useContext } from 'react'
import { ThemeContext } from '../../../contexts/ThemeContext';
import { API_userLogin } from "../../../apis/UserRequest";
import { showErrorNoti } from '../../utilities/ShowNotification';
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import "./Login.css";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions/userActions";

const Login = () => {
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    //trim whitespaces after leaving the input fields
    const formatInput = (e) => {
        setLoginObj({ ...loginObj, [e.target.name]: e.target.value.trim() });
    }

    //loading spinner indicator
    const [loading, setLoading] = useState(false);
    const [loginObj, setLoginObj] = useState({
        username: "",
        password: ""
    });

    const [demoLoginObj, setDemoLoginObj] = useState({
        username: "demo",
        password: process.env.REACT_APP_DEMO_USER_PASSWORD
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
            dispatch(updateUser(result.userDetails)); //store into redux userReducer
            navigate("/home");
            setLoading(false);
        } else if (result.status === false) {
            console.log(result);
            { result.message.response.status === 401 ? showErrorNoti("Incorrect Username or Password", "Please try again.") : showErrorNoti("Internal Server Error", "Please try again.") }
        }
        setLoading(false);
    }

    //handle submit button click
    const handleDemoSubmit = async () => {
        const result = await API_userLogin(demoLoginObj);
        if (result.status === true) {
            localStorage.setItem("token", result.token);
            dispatch(updateUser(result.userDetails)); //store into redux userReducer
            navigate("/home");
            setLoading(false);
        } else if (result.status === false) {
            console.log(result);
            { result.message.response.status === 401 ? showErrorNoti("Incorrect Username or Password", "Please try again.") : showErrorNoti("Internal Server Error", "Please try again.") }
        }
    }

    return (
        <div className={theme === "light" ? "loginSection" : "loginSection-dark"}>
            <h1>Sign In</h1>
            <input type="text" name="username" className="loginInput" placeholder="Username" onChange={handleChange} onBlur={formatInput} />
            <input type="password" name="password" className="loginInput" placeholder="Password" onChange={handleChange} onBlur={formatInput} />
            <button className="button login-btn" onClick={handleSubmit}>{loading ? <PulseLoader size={10} color={"white"} /> : "Log In"}</button>
            <button className="button login-btn demoLogin-btn" onClick={handleDemoSubmit}>{loading ? <PulseLoader size={10} color={"white"} /> : "Log In as Demo User"}</button>
        </div>
    )
}

export default Login