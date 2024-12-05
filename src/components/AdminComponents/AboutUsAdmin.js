import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Container, Typography, Button, CircularProgress, Alert, Box, TextField } from '@mui/material';

const AboutUsAdmin = () => {
    const [content, setContent] = useState({
        aboutUsEn: '',
        visionEn: '',
        missionEn: '',
        aboutUsHi: '',
        visionHi: '',
        missionHi: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${config.apiBaseUrl}/about-us`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                if (response.data) {
                    setContent(response.data);
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

    const handleContentChange = (e, field) => {
        setContent(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.post(`${config.apiBaseUrl}/about-us`, content, {
            headers: { Authorization: `Bearer ${token}` }
        })
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
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel - Content Management
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" gutterBottom>English Content</Typography>
                    
                    <Typography variant="h6" gutterBottom>About Us</Typography>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            value={content.aboutUsEn}
                            onChange={(e) => handleContentChange(e, 'aboutUsEn')}
                            placeholder="Enter HTML content"
                        />
                    </Box>

                    <Typography variant="h6" gutterBottom>Vision</Typography>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            value={content.visionEn}
                            onChange={(e) => handleContentChange(e, 'visionEn')}
                            placeholder="Enter HTML content"
                        />
                    </Box>

                    <Typography variant="h6" gutterBottom>Mission</Typography>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            value={content.missionEn}
                            onChange={(e) => handleContentChange(e, 'missionEn')}
                            placeholder="Enter HTML content"
                        />
                    </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" gutterBottom>Hindi Content</Typography>
                    
                    <Typography variant="h6" gutterBottom>About Us (हमारे बारे में)</Typography>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            value={content.aboutUsHi}
                            onChange={(e) => handleContentChange(e, 'aboutUsHi')}
                            placeholder="HTML सामग्री दर्ज करें"
                        />
                    </Box>

                    <Typography variant="h6" gutterBottom>Vision (दृष्टि)</Typography>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            value={content.visionHi}
                            onChange={(e) => handleContentChange(e, 'visionHi')}
                            placeholder="HTML सामग्री दर्ज करें"
                        />
                    </Box>

                    <Typography variant="h6" gutterBottom>Mission (लक्ष्य)</Typography>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            value={content.missionHi}
                            onChange={(e) => handleContentChange(e, 'missionHi')}
                            placeholder="HTML सामग्री दर्ज करें"
                        />
                    </Box>
                </Box>

                <Button variant="contained" color="primary" type="submit" size="large">
                    Update All Content
                </Button>
            </form>
        </Container>
    );
};

export default AboutUsAdmin;