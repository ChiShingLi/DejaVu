import React from 'react';
import { IoAdd, IoSearchOutline } from 'react-icons/io5'

import "./Navbar.css"

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo-section">
                <div className="logoText">
                    DejaVu
                </div>
            </div>
            <div className="middle">
                <div className="middle-section">
                    <div className="searchContent">
                        <span className="searchIcon"><IoSearchOutline size={20} color={"grey"}/></span>
                        <input type="text" className="searchBox" placeholder="What's happening?" />
                    </div>
                    <button className="button create-btn btn-content"><IoAdd size={20} /> Create new post</button>
                </div>
            </div>
            <div className="right-section">
                <div className="item1">1</div>
                <div className="item2">2</div>
                <div className="item3">3</div>
            </div>
        </div>
    )
}

export default Navbar