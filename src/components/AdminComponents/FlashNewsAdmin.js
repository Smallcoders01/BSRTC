import React, { useEffect, useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Alert, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';
import config from '../../config'; // Import your config for API base URL

const FlashNewsAdmin = () => {
    const [flashNews, setFlashNews] = useState([]);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchFlashNews = async () => {
        try {
            const response = await axios.get(`${config.apiBaseUrl}/flash-news`); // Adjust the API endpoint as necessary
            setFlashNews(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching flash news');
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = { title, url };

        const apiUrl = flashNews._id ? `${config.apiBaseUrl}/flash-news/${flashNews._id}` : `${config.apiBaseUrl}/flash-news`;
        const method = flashNews._id ? 'put' : 'post';

        try {
            await axios[method](apiUrl, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            fetchFlashNews(); // Refresh the list
            setTitle('');
            setUrl('');
        } catch (err) {
            setError('Error adding/updating flash news');
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${config.apiBaseUrl}/flash-news/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchFlashNews(); // Refresh the list after deletion
        } catch (err) {
            setError('Error deleting flash news');
        }
    };

    useEffect(() => {
        fetchFlashNews();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div>
            <h2>Manage Flash News</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <TextField
                    label="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <Button type="submit">Add Flash News</Button>
            </form>
            <List>
                {flashNews.map((news) => (
                    <ListItem key={news._id}>
                        <ListItemText primary={news.title} secondary={news.url} />
                        <IconButton onClick={() => handleDelete(news._id)} color="secondary">
                            <Delete />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default FlashNewsAdmin;
