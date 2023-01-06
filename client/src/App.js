import React, { useState } from 'react';

import "./App.css";
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Main from './pages/main/Main';
import Profile from './pages/profile/Profile'
import { ThemeContext } from "./contexts/ThemeContext";
import { RequireAuthContext } from "./contexts/RequireAuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NotificationsProvider } from '@mantine/notifications'
import About from './pages/about/About';
import Settings from './pages/settings/Settings';

const App = () => {
    const [theme, setTheme] = useState("light");
    return (
        <Router>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <NotificationsProvider>
                    <div className="App" id={theme}>
                        <div className="firework2" style={{ top: "10px" }} />
                        <div className="firework2" style={{ right: "20px", bottom: "0px" }} />
                        <div className="firework" style={{ bottom: "10px" }} />
                        <div className="firework" style={{ right: "10px" }} />
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/home" element={<RequireAuthContext><Home /></RequireAuthContext>} />
                            <Route path="/profile/:username" element={<Profile />} />
                            <Route path="/settings" element={<RequireAuthContext><Settings /></RequireAuthContext>} />
                            <Route path="*" element={<Main />} />
                        </Routes>
                    </div>
                </NotificationsProvider>

            </ThemeContext.Provider>
        </Router>
    )
}

export default App;