import React, { useState } from 'react'
import { API_userRegister } from "../../../apis/UserRequest";

import "./Signup.css"
const Signup = () => {
    const [registerObj, setRegisterObj] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setRegisterObj({ ...registerObj, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await API_userRegister(registerObj);

        //handle returned result
        if (result.status === true) {
            localStorage.setItem("token", result.token);
            //TODO: redirect to homepage
        } else {
            //TODO: custom error message
            console.log(result.message)
        }
    }

    return (
        <div className="signupSection">
            <h1>Sign Up</h1>
            <input type="text" className="loginInput" name="fullName" placeholder="Full name" value={registerObj.fullName} onChange={handleChange} />
            <input type="text" className="loginInput" name="username" placeholder="Username" value={registerObj.username} onChange={handleChange} />
            <input type="password" className="loginInput" name="password" placeholder="Password" value={registerObj.password} onChange={handleChange} />
            <input type="password" className="loginInput" name="confirmPassword" placeholder="Confirm Password" value={registerObj.confirmPassword} onChange={handleChange} />
            <button className="button signup-btn" onClick={handleSubmit}>Sign Up</button>
        </div>
    )
}

export default Signup