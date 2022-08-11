import React from 'react'

import "./Signup.css"
const Signup = () => {
    return (
        <div className="signupSection">
            <h1>Sign Up</h1>
            <input type="text" className="loginInput" placeholder="Full name" />
            <input type="text" className="loginInput" placeholder="Username" />
            <input type="password" className="loginInput" placeholder="Password" />
            <input type="password" className="loginInput" placeholder="Confirm Password" />
            <button className="button signup-btn">Sign Up</button>
        </div>
    )
}

export default Signup