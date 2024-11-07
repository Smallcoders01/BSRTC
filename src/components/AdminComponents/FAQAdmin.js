import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config'; // Adjust the path to the correct location of your config file
import { Container, Typography, TextField, Button, CircularProgress, Alert, Box, IconButton, Paper } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const FAQAdmin = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        // Fetch the current FAQs
        axios.get(`${config.apiBaseUrl}/faq`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setFaqs(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching FAQs');
                setLoading(false);
            });
    }, []);

    const handleFAQChange = (index, field, value) => {
        const newFaqs = [...faqs];
        newFaqs[index][field] = value;
        setFaqs(newFaqs);
    };

    const handleAddFAQ = () => {
        setFaqs([...faqs, { questionEn: '', answerEn: '', questionHi: '', answerHi: '' }]);
    };

    const handleRemoveFAQ = (index) => {
        const token = localStorage.getItem('token');
        const faqId = faqs[index]._id;
        axios.delete(`${config.apiBaseUrl}/faq/${faqId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                const newFaqs = faqs.filter((_, i) => i !== index);
                setFaqs(newFaqs);
                alert('FAQ deleted successfully');
            })
            .catch(error => {
                setError('Error deleting FAQ');
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        faqs.forEach(faq => {
            const url = faq._id ? `${config.apiBaseUrl}/faq/${faq._id}` : `${config.apiBaseUrl}/faq`;
            const method = faq._id ? 'put' : 'post';
            axios[method](url, faq, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    alert('FAQs updated successfully');
                    // Update the faqs state with the new data
                    setFaqs(prevFaqs => {
                        const updatedFaqs = [...prevFaqs];
                        const index = updatedFaqs.findIndex(f => f._id === faq._id);
                        if (index !== -1) {
                            updatedFaqs[index] = response.data;
                        } else {
                            updatedFaqs.push(response.data);
                        }
                        return updatedFaqs;
                    });
                })
                .catch(error => {
                    setError('Error updating FAQs');
                });
        });
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel - FAQs
            </Typography>
            <form onSubmit={handleSubmit}>
                {faqs.map((faq, faqIndex) => (
                    <Paper key={faq._id || faqIndex} sx={{ p: 2, mb: 2 }}>
                        <Box mb={2}>
                            <TextField
                                label="Question (English)"
                                variant="outlined"
                                fullWidth
                                value={faq.questionEn}
                                onChange={(e) => handleFAQChange(faqIndex, 'questionEn', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Answer (English)"
                                variant="outlined"
                                fullWidth
                                value={faq.answerEn}
                                onChange={(e) => handleFAQChange(faqIndex, 'answerEn', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Question (Hindi)"
                                variant="outlined"
                                fullWidth
                                value={faq.questionHi}
                                onChange={(e) => handleFAQChange(faqIndex, 'questionHi', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Answer (Hindi)"
                                variant="outlined"
                                fullWidth
                                value={faq.answerHi}
                                onChange={(e) => handleFAQChange(faqIndex, 'answerHi', e.target.value)}
                            />
                        </Box>
                        <Box mt={2}>
                            <IconButton onClick={() => handleRemoveFAQ(faqIndex)} color="secondary">
                                <Delete />
                            </IconButton>
                        </Box>
                    </Paper>
                ))}
                <Button variant="contained" color="primary" onClick={handleAddFAQ} startIcon={<Add />}>
                    Add FAQ
                </Button>
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Update FAQs
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default FAQAdmin;