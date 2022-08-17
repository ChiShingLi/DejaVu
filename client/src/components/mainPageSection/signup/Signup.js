import React, { useState, useContext } from 'react'
import { API_userRegister } from "../../../apis/UserRequest";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../../../contexts/ThemeContext';
import { showErrorNoti } from '../../utilities/ShowNotification';
import PulseLoader from "react-spinners/PulseLoader";
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    //loading spinner indicator
    const [loading, setLoading] = useState(false);

    //user signup details object
    const [registerObj, setRegisterObj] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    //trim whitespaces after leaving the input fields
    const formatInput = (e) => {
        setRegisterObj({ ...registerObj, [e.target.name]: e.target.value.trim() });
    }

    //handle inputs on changes
    const handleChange = (e) => {
        setRegisterObj({ ...registerObj, [e.target.name]: e.target.value });
    }

    //handle submit button on click
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await API_userRegister(registerObj);
        if (registerObj.password !== registerObj.confirmPassword) {
            showErrorNoti("Passwords Doesn't Match", "Pleae make sure both passwords match.")
        } else {
            //handle returned result
            if (result.status === true) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("userDetails", JSON.stringify(result.userDetails))
                //success, redirect to home page
                navigate("/Home");
            } else if (result.status === false) {
                { result.message.response.status === 409 ? showErrorNoti("Username Already Exists", "Please choose a different username.") : showErrorNoti("Internal Server Error", "Please try again later.") }
            }
        }
        setLoading(false);
    }

    return (
        <div className={theme === "light" ? "signupSection" : "signupSection-dark"}>
            <h1>Sign Up</h1>
            <input type="text" className="loginInput" name="fullName" placeholder="Full name" value={registerObj.fullName} onChange={handleChange} onBlur={formatInput} />
            <input type="text" className="loginInput" name="username" placeholder="Username" value={registerObj.username} onChange={handleChange} onBlur={formatInput} />
            <input type="password" className="loginInput" name="password" placeholder="Password" value={registerObj.password} onChange={handleChange} onBlur={formatInput} />
            <input type="password" className="loginInput" name="confirmPassword" placeholder="Confirm Password" value={registerObj.confirmPassword} onChange={handleChange} onBlur={formatInput} />
            <button className="button signup-btn" onClick={handleSubmit}>{loading ? <PulseLoader size={10} color={"white"} /> : "Sign Up"}</button>
        </div>
    )
}

export default Signup