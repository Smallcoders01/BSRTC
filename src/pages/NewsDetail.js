import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Banner from '../components/UserComponents/Banner';
import Footer from '../components/UserComponents/Footer/footer';
import Announcement from '../components/Announcement'; // Import the Announcement component
import config from '../config'; // Import the config
import './NewsDetail.css'; // Import your CSS file

const NewsDetail = () => {
    const { id } = useParams(); // Get the article ID from the URL
    const [article, setArticle] = useState(null);
    const [flashNews, setFlashNews] = useState([]); // State to hold flash news data
    const language = localStorage.getItem('language') || 'en';

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/news/${id}`); // Fetch the article by ID
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        const fetchFlashNews = async () => {
            try {
                const response = await axios.get(`${config.apiBaseUrl}/flash-news`); // Fetch flash news
                setFlashNews(response.data); // Set flash news data
            } catch (error) {
                console.error('Error fetching flash news:', error);
            }
        };

        fetchArticle();
        fetchFlashNews(); // Call the fetch function for flash news
    }, [id]);

    if (!article) return <div>Loading...</div>; // Show loading state

    return (
        <div>
            <Banner title={language === 'en' ? 'News' : 'गैलरी'} />
            <div style={{ display: 'flex', marginTop: '20px' }}>
                <div style={{ flex: '3', textAlign: 'left' }}>
                    <div className="news-detail-container">
                        <h1>{language === 'en' ? article.title : article.title_hindi}</h1>
                        <p className="news-meta">
                            {new Date(article.publish).toLocaleDateString()} | {article.author}
                        </p>
                        <img 
                            src={`${config.baseUrl}/${article.photo}`} // Use the correct property for the photo
                            alt={article.title} 
                            className="news-detail-thumbnail" 
                        />
                        <p>{language === 'en' ? article.content : article.content_hindi}</p>
                    </div>
                </div>
                <div style={{ flex: '1', marginLeft: '20px' }}>
                    <Announcement announcements={flashNews} /> {/* Pass flash news to Announcement */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NewsDetail; 