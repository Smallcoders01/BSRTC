import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import config from '../../config';

const NewsAdmin = () => {
    const [news, setNews] = useState([]);
    const [formData, setFormData] = useState({
        title: { en: '', hi: '' },
        publish: '',
        authorName: { en: '', hi: '' },
        thumbnailPhoto: null,
        headline: { en: '', hi: '' },
        subline: { en: '', hi: '' },
        photo: null,
    });

    // Retrieve the token from local storage or context
    const token = localStorage.getItem('token'); // Adjust this line based on where you store your token

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get(`${config.apiBaseUrl}/news`, {
                headers: { Authorization: `Bearer ${token}` } // Include the token in the headers
            });
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Split the name to handle nested state
        const keys = name.split('.');
        if (keys.length === 2) {
            setFormData((prev) => ({
                ...prev,
                [keys[0]]: {
                    ...prev[keys[0]],
                    [keys[1]]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
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
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        // Log the form data
        for (let [key, value] of form.entries()) {
            console.log(key, value);
        }

        try {
            await axios.post(`${config.apiBaseUrl}/news`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
            fetchNews(); // Refresh the news list
            setFormData({
                title: { en: '', hi: '' },
                publish: '',
                authorName: { en: '', hi: '' },
                thumbnailPhoto: null,
                headline: { en: '', hi: '' },
                subline: { en: '', hi: '' },
                photo: null,
            });
        } catch (error) {
            console.error('Error creating news:', error);
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
                            label="Title (English)"
                            name="title.en"
                            value={formData.title.en}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Title (Hindi)"
                            name="title.hi"
                            value={formData.title.hi}
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
                            label="Author Name (English)"
                            name="authorName.en"
                            value={formData.authorName.en}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Author Name (Hindi)"
                            name="authorName.hi"
                            value={formData.authorName.hi}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Headline (English)"
                            name="headline.en"
                            value={formData.headline.en}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Headline (Hindi)"
                            name="headline.hi"
                            value={formData.headline.hi}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Subline (English)"
                            name="subline.en"
                            value={formData.subline.en}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4} // Adjust the number of rows as needed
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Subline (Hindi)"
                            name="subline.hi"
                            value={formData.subline.hi}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4} // Adjust the number of rows as needed
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            type="file"
                            name="thumbnailPhoto"
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
                        <Typography variant="h6">{article.title.en}</Typography>
                        <Typography variant="body2">{article.headline.en}</Typography>
                        <Typography variant="body2">Published on: {new Date(article.publish).toLocaleDateString()}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default NewsAdmin;