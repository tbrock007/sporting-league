import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        // Fetch news articles from the API
        axios
            .get('http://localhost:4000/api/news')
            .then((response) => setNews(response.data))
            .catch((error) => console.error('Error fetching news:', error));
    }, []);

    return (
        <div className="news-page">
            {/* Page Header */}
            <header className="news-header text-center text-white">
                <h1>News & Announcements</h1>
                <p>Stay up-to-date with the latest updates from the league!</p>
            </header>

            {/* News Cards */}
            <div className="container mt-5">
                <div className="row g-4">
                    {news.map((article) => (
                        <div className="col-md-4" key={article.id}>
                            <div className="card news-card shadow">
                                <div className="card-body">
                                    <h5 className="card-title">{article.title}</h5>
                                    <p className="card-text">
                                        {article.content.length > 100
                                            ? `${article.content.substring(0, 100)}...`
                                            : article.content}
                                    </p>
                                    <p className="card-date">
                                        Published on: {new Date(article.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;