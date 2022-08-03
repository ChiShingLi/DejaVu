import React from 'react';
import LeftSection from '../../components/leftSection/LeftSection';

import "./Home.css";
const Home = () => {
    return (
        <div className="home-content">
            <LeftSection />
            <div>Feeds</div>
            <div>Trending News</div>
        </div>
    )
}

export default Home;