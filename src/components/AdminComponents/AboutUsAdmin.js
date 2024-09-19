import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Container, Typography, Button, CircularProgress, Alert, Box } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        modules={{
                            toolbar: [
                                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                                [{size: []}],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{'list': 'ordered'}, {'list': 'bullet'}, 
                                 {'indent': '-1'}, {'indent': '+1'}],
                                ['link', 'image', 'video'],
                                ['clean']
                            ],
                        }}
                        formats={[
                            'header', 'font', 'size',
                            'bold', 'italic', 'underline', 'strike', 'blockquote',
                            'list', 'bullet', 'indent',
                            'link', 'image', 'video'
                        ]}
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