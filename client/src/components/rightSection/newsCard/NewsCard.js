import React, { useEffect, useState, useContext } from 'react';

import axios from "axios";
import NewsFeed from '../newsFeed/NewsFeed';
import { ThemeContext } from '../../../contexts/ThemeContext';

import "./NewsCard.css";
const NewsCard = () => {
    const { theme } = useContext(ThemeContext);
    const [newsData, setNewsData] = useState(null);
    const getNews = () => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&pageSize=5&category=science`)
            .then(res => {
                const newsResult = res.data.articles;
                setNewsData(newsResult);
            })
    }

    //get news on load
    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className={theme === "light" ? "newsCard" : "newsCard-dark"}>
            <h3>What’s happening</h3>
            {newsData && newsData.map((news) => {
                return (
                    <NewsFeed newsObj={news} />
                )
            })}
        </div>
    )
}

export default NewsCard;