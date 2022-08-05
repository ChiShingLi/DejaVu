import React from 'react';
import LeftSection from '../../components/leftSection/LeftSection';
import MainSection from '../../components/mainSection/MainSection';

import "./Home.css";
const Home = () => {
    return (
        <div className="home-content">
            <LeftSection />
            <MainSection />
            <div>Trending News</div>
        </div>
    )
}

export default Home;