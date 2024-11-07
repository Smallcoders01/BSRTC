import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Container, Typography, Button, CircularProgress, Alert, Box } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

    const handleContentChange = (value, field) => {
        setContent(prev => ({
            ...prev,
            [field]: value
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
                        <ReactQuill
                            value={content.aboutUsEn}
                            onChange={(value) => handleContentChange(value, 'aboutUsEn')}
                            modules={{ toolbar: toolbarOptions }}
                            formats={formats}
                        />
                    </Box>

                    <Typography variant="h6" gutterBottom>Vision</Typography>
                    <Box mb={2}>
                        <ReactQuill
                            value={content.visionEn}
                            onChange={(value) => handleContentChange(value, 'visionEn')}
                            modules={{ toolbar: toolbarOptions }}
                            formats={formats}
                        />
                    </Box>

                    <Typography variant="h6" gutterBottom>Mission</Typography>
                    <Box mb={2}>
                        <ReactQuill
                            value={content.missionEn}
                            onChange={(value) => handleContentChange(value, 'missionEn')}
                            modules={{ toolbar: toolbarOptions }}
                            formats={formats}
                        />
                    </Box>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" gutterBottom>Hindi Content</Typography>
                    
                    <Typography variant="h6" gutterBottom>About Us (हमारे बारे में)</Typography>
                    <Box mb={2}>
                        <ReactQuill
                            value={content.aboutUsHi}
                            onChange={(value) => handleContentChange(value, 'aboutUsHi')}
                            modules={{ toolbar: toolbarOptions }}
                            formats={formats}
                        />
                    </Box>

                    <Typography variant="h6" gutterBottom>Vision (दृष्टि)</Typography>
                    <Box mb={2}>
                        <ReactQuill
                            value={content.visionHi}
                            onChange={(value) => handleContentChange(value, 'visionHi')}
                            modules={{ toolbar: toolbarOptions }}
                            formats={formats}
                        />
                    </Box>

                    <Typography variant="h6" gutterBottom>Mission (लक्ष्य)</Typography>
                    <Box mb={2}>
                        <ReactQuill
                            value={content.missionHi}
                            onChange={(value) => handleContentChange(value, 'missionHi')}
                            modules={{ toolbar: toolbarOptions }}
                            formats={formats}
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

const toolbarOptions = [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
];

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

export default AboutUsAdmin;