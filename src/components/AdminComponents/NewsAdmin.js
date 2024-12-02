import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import config from '../../config';

const NewsAdmin = () => {
    const [news, setNews] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        publish: '',
        thumbnail: null,
        headline: '',
        subline: '',
        photo: null,
        content: '',
        title_hindi: '',
        publish_hindi: '',
        content_hindi: '',
        headline_hindi: ''
    });

    // Retrieve the token from local storage or context
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get(`${config.apiBaseUrl}/news`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        
        // Append all fields to FormData
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        // Log the form data before sending
        console.log('Form Data being sent:', Object.fromEntries(form.entries()));

        try {
            await axios.post(`${config.apiBaseUrl}/news`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
            fetchNews(); // Refresh the news list
            setFormData({
                title: '',
                publish: '',
                thumbnail: null,
                headline: '',
                subline: '',
                photo: null,
                content: '',
                title_hindi: '',
                publish_hindi: '',
                content_hindi: '',
                headline_hindi: ''
            });
        } catch (error) {
            console.error('Error creating news:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                await axios.delete(`${config.apiBaseUrl}/news/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchNews(); // Refresh the news list after deletion
            } catch (error) {
                console.error('Error deleting article:', error);
            }
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Manage News Articles
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Publish Date"
                            type="date"
                            name="publish"
                            value={formData.publish}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Headline"
                            name="headline"
                            value={formData.headline}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Subline"
                            name="subline"
                            value={formData.subline}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            type="file"
                            name="thumbnail"
                            onChange={handleFileChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            type="file"
                            name="photo"
                            onChange={handleFileChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Title (Hindi)"
                            name="title_hindi"
                            value={formData.title_hindi}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Publish Date (Hindi)"
                            type="date"
                            name="publish_hindi"
                            value={formData.publish_hindi}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Content (Hindi)"
                            name="content_hindi"
                            value={formData.content_hindi}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Headline (Hindi)"
                            name="headline_hindi"
                            value={formData.headline_hindi}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Create News Article
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                Existing News Articles
            </Typography>
            {news.map((article) => (
                <Card key={article._id} style={{ marginBottom: '10px' }}>
                    <CardContent>
                        <Typography variant="h6">{article.title}</Typography>
                        <Typography variant="body2">{article.headline}</Typography>
                        <Typography variant="body2">Published on: {new Date(article.publish).toLocaleDateString()}</Typography>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            onClick={() => handleDelete(article._id)} // Delete button
                        >
                            Delete
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default NewsAdmin;