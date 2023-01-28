import React from 'react'

import "./About.css";
const About = () => {
    return (
        <div className="about-section">
            <div className="about-box">
                <div className="about-title">
                    About <span></span>
                </div>
                <div className="about-description">
                    <div className="about-dejavu">DejaVu</div> is a full-stack social networking web application project by <b>Chi Li</b> , built using the MERN stack. It allows users to communicate and interact with other users around the world by sharing their thoughts, ideas and opinions in the form of photo and text feed.
                    <br />
                    <br />
                    Full documentations and source code available at GitHub: <a href="https://github.com/ChiShingLi/DejaVu" target="_blank" rel="noopener noreferrer">Github</a>
                </div>
            </div>
        </div>
    )
}

export default About