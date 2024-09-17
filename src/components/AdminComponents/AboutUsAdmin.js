import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Box } from '@mui/material';

const AboutUsAdmin = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the current content
        axios.get(`${config.apiBaseUrl}/about-us`)
            .then(response => {
                if (response.data && response.data.content !== undefined) {
                    setContent(response.data.content);
                } else {
                    setError('Invalid response format');
                }
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching content');
                setLoading(false);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the content
        axios.post(`${config.apiBaseUrl}/about-us`, { content })
            .then(response => {
                alert('Content updated successfully');
            })
            .catch(error => {
                setError('Error updating content');
            });
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel - About Us
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        label="About Us Content"
                        multiline
                        rows={10}
                        variant="outlined"
                        fullWidth
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Box>
                <Button variant="contained" color="primary" type="submit">
                    Update Content
                </Button>
            </form>
        </Container>
    );
};

export default AboutUsAdmin;