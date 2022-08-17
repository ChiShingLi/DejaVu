import React, { useContext } from 'react';
import { IoSearchOutline, IoSunnyOutline, IoMoonOutline, IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5'
import { ThemeContext } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        //remove current user token and redirect to main page
        localStorage.clear();
        navigate("/");
    }

    const { theme, setTheme } = useContext(ThemeContext);
    const toggleTheme = () => {
        setTheme((cur) => (cur === "light" ? "dark" : "light"));
    }
    return (
        <div className={theme === "light" ? "navbar" : "navbar-dark"}>
            <div className="logo-section">
                <div className="logoText">
                    DejaVu
                </div>
            </div>
            <div className="middle">
                <div className="middle-section">
                    <div className="searchContent">
                        <span className="searchIcon"><IoSearchOutline size={20} color={"grey"} /></span>
                        <input type="text" className="searchBox" placeholder="What's happening?" />
                    </div>
                </div>
            </div>
            <div className="right-section">
                <div className="icon1" onClick={toggleTheme}>{theme === "dark" ? <IoSunnyOutline size={30} color={"orange"} /> : <IoMoonOutline size={30} color={"rgba(240, 238, 84, 0.74)"} />}</div>
                <div className="icon2"><IoSettingsOutline size={30} /></div>
                <div className="icon3"><IoLogOutOutline size={30} onClick={handleLogout} /></div>
            </div>
        </div>
    )
}

export default Navbar