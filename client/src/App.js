import React from 'react';

import "./App.css";
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
const App = () => {
    return (
        <div className="App">
            <div className="firework2" style={{ top: "10px" }} />
            <div className="firework2" style={{ right: "20px", bottom: "0px" }} />
            <div className="firework" style={{ bottom: "10px" }} />
            <div className="firework" style={{ right: "10px" }} />
            <Navbar />
            <Home />
        </div>
    )
}

export default App;