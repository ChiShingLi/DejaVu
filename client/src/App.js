import React, { useState } from 'react';

import "./App.css";
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Main from './pages/main/Main';
import { ThemeContext } from "./contexts/ThemeContext";
import { RequireAuthContext } from "./contexts/RequireAuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NotificationsProvider } from '@mantine/notifications'

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
                            <Route path="/home" element={<RequireAuthContext><Home /></RequireAuthContext>} />
                        </Routes>
                    </div>
                </NotificationsProvider>
            </ThemeContext.Provider>
        </Router>
    )
}

export default App;