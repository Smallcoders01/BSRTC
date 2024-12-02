import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config'; // Updated path
import { Container, Typography, TextField, Button, CircularProgress, Alert, Box, IconButton, Paper } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const TenderAdmin = () => {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        // Fetch the current tenders
        axios.get(`${config.apiBaseUrl}/tenders`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log(response.data); // Log the response data
                setTenders(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching tenders');
                setLoading(false);
            });
    }, []);

    const handleTenderChange = (index, field, value) => {
        const newTenders = [...tenders];
        newTenders[index][field] = value;
        setTenders(newTenders);
    };

    const handleFileChange = (index, file) => {
        const newTenders = [...tenders];
        newTenders[index].file = file;
        setTenders(newTenders);
    };

    const handleAddTender = () => {
        setTenders([...tenders, { name: '', referenceNo: '', closingDate: '', bidOpeningDate: '', file: null }]);
    };

    const handleRemoveTender = (index) => {
        const token = localStorage.getItem('token');
        const tenderId = tenders[index]._id;
        axios.delete(`${config.apiBaseUrl}/tenders/${tenderId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                const newTenders = tenders.filter((_, i) => i !== index);
                setTenders(newTenders);
                alert('Tender deleted successfully');
            })
            .catch(error => {
                setError('Error deleting tender');
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        tenders.forEach(tender => {
            const formData = new FormData();
            formData.append('name', tender.name);
            formData.append('referenceNo', tender.referenceNo);
            formData.append('closingDate', tender.closingDate);
            formData.append('bidOpeningDate', tender.bidOpeningDate);
            if (tender.file) {
                formData.append('pdf', tender.file); // Ensure the field name is 'pdf'
            }

            const url = tender._id ? `${config.apiBaseUrl}/tenders/${tender._id}` : `${config.apiBaseUrl}/tenders`;
            const method = tender._id ? 'put' : 'post';
            axios[method](url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    alert('Tenders updated successfully');
                    // Update the tenders state with the new data
                    setTenders(prevTenders => {
                        const updatedTenders = [...prevTenders];
                        const index = updatedTenders.findIndex(t => t._id === tender._id);
                        if (index !== -1) {
                            updatedTenders[index] = response.data;
                        } else {
                            updatedTenders.push(response.data);
                        }
                        return updatedTenders;
                    });
                })
                .catch(error => {
                    setError('Error updating tenders');
                });
        });
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel - Tenders
            </Typography>
            <form onSubmit={handleSubmit}>
                {tenders.map((tender, tenderIndex) => (
                    <Paper key={tender._id || tenderIndex} sx={{ p: 2, mb: 2 }}>
                        <Box mb={2}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={tender.name}
                                onChange={(e) => handleTenderChange(tenderIndex, 'name', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Reference No"
                                variant="outlined"
                                fullWidth
                                value={tender.referenceNo}
                                onChange={(e) => handleTenderChange(tenderIndex, 'referenceNo', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Closing Date"
                                variant="outlined"
                                fullWidth
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={tender.closingDate ? tender.closingDate.split('T')[0] : ''} // Format to YYYY-MM-DD
                                onChange={(e) => handleTenderChange(tenderIndex, 'closingDate', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Bid Opening Date"
                                variant="outlined"
                                fullWidth
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={tender.bidOpeningDate ? tender.bidOpeningDate.split('T')[0] : ''} // Format to YYYY-MM-DD
                                onChange={(e) => handleTenderChange(tenderIndex, 'bidOpeningDate', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(tenderIndex, e.target.files[0])}
                            />
                            {tender.file && (
                                <a href={`${config.baseUrl}/${tender.file}`} target="_blank" rel="noopener noreferrer">
                                    View PDF
                                </a>
                            )}
                        </Box>
                        <Box mt={2}>
                            <IconButton onClick={() => handleRemoveTender(tenderIndex)} color="secondary">
                                <Delete />
                            </IconButton>
                        </Box>
                    </Paper>
                ))}
                <Button variant="contained" color="primary" onClick={handleAddTender} startIcon={<Add />}>
                    Add Tender
                </Button>
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Update Tenders
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default TenderAdmin;