import React from 'react';
import LeftSection from '../../components/leftSection/LeftSection';
import MainSection from '../../components/mainSection/MainSection';
import RightSection from '../../components/rightSection/RightSection';

import "./Home.css";
const Home = () => {
    return (
        <div className="home-content">
            <LeftSection />
            <MainSection />
            <RightSection />
        </div>
    )
}

export default Home;