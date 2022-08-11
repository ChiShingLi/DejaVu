import React from 'react'


import "./Login.css";
const Login = () => {
    return (
        <div className="loginSection">
            <h1>Sign In</h1>
            <input type="text" className="loginInput" placeholder="Username" />
            <input type="password" className="loginInput" placeholder="Password" />
            <button className="button login-btn">Log In</button>
        </div>
    )
}

export default Login