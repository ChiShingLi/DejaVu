import React, { useState } from 'react';

import "./App.css";
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Main from './pages/main/Main';
import { ThemeContext } from "./contexts/ThemeContext";

const App = () => {
    const [theme, setTheme] = useState("light");
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className="App" id={theme}>
                <div className="firework2" style={{ top: "10px" }} />
                <div className="firework2" style={{ right: "20px", bottom: "0px" }} />
                <div className="firework" style={{ bottom: "10px" }} />
                <div className="firework" style={{ right: "10px" }} />
                {/* <Navbar />
                <Home /> */}
                <Main />
            </div>
        </ThemeContext.Provider>
    )
}

export default App;