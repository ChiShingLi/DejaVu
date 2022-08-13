import React, { useState, useEffect } from 'react'
import Login from '../../components/mainPageSection/login/Login'
import Signup from '../../components/mainPageSection/signup/Signup'
import { useNavigate } from "react-router-dom";
import "./Main.css"
const Main = () => {
    const navigate = useNavigate();
    useEffect(() => {
        //redirect if already logged in
        if (localStorage.getItem("token") !== null) {
            navigate("/home");
        }
    }, []);
    const [isLogin, setIsLogin] = useState(true);

    const handleClick = () => {
        //handle login/signup click
        setIsLogin(prev => !prev);
    }

    return (
        <div className="mainPage">
            <div className="main-leftSection">
                <h1>DejaVu</h1>
                <h2>Stay in the know with latest updates and news.</h2>
            </div>
            <div className="main-rightSection">
                {isLogin ? <Login /> : <Signup />}
                <div className="notice">
                    <p>{isLogin ? <span><b>Don't have an account?</b> <span className="notice-btn" onClick={handleClick}>Sign up</span></span> : <span><b>Have an account?</b> <span className="notice-btn" onClick={handleClick}>Log in</span></span>}</p>
                </div>
            </div>
        </div>
    )
}

export default Main