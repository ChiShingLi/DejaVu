import React, { useEffect, useState } from 'react';

import axios from "axios";
import "./NewsCard.css";
import NewsFeed from '../newsFeed/NewsFeed';
const NewsCard = () => {
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
        <div className="newsCard">
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