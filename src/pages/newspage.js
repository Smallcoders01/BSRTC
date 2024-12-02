import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/UserComponents/Banner';
import Footer from '../components/UserComponents/Footer/footer';
import Announcement from '../components/Announcement'; // Import the Announcement component
import config from '../config'; // Import the config
import './NewsPage.css'; // Import your CSS file

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [flashNews, setFlashNews] = useState([]); // State for flash news
    const language = localStorage.getItem('language') || 'en';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/news`); // Fetch news from API
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        const fetchFlashNews = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/flash-news`); // Fetch flash news from API
                setFlashNews(response.data); // Set flash news data
            } catch (error) {
                console.error('Error fetching flash news:', error);
            }
        };

        fetchNews();
        fetchFlashNews(); // Call the fetch function for flash news
    }, []);

    const handleArticleClick = (articleId) => {
        navigate(`/news-detail/${articleId}`); // Navigate to the article detail page
    };

    return (
        <div>
            <Banner title={language === 'en' ? 'News and Articles' : 'समाचार और लेख'} />
            <div className="flex-container">
                <div className="news-container">
                    {news.map((article) => (
                        <div key={article._id} className="news-card" onClick={() => handleArticleClick(article._id)}>
                            <img 
                                src={`${config.baseUrl}/${article.thumbnail}`} 
                                alt={article.title} 
                                className="news-thumbnail"
                            />
                            <h2 className="news-title">{language === 'en' ? article.title : article.title_hindi}</h2>
                            <h4 className="news-headline">{language === 'en' ? article.headline : article.headline_hindi}</h4>
                            <p className="news-publish-date">{new Date(article.publish).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
                <div className="announcement-section">
                    <Announcement announcements={flashNews} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NewsPage;