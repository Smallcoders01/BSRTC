import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Box, Grid, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const ContactUsAdmin = () => {
    const [mainPhoneNumber, setMainPhoneNumber] = useState('');
    const [mainEmail, setMainEmail] = useState('');
    const [divisions, setDivisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the current contact information and divisions
        axios.get(`${config.apiBaseUrl}/contact`)
            .then(response => {
                if (response.data) {
                    setMainPhoneNumber(response.data.contact.mainPhoneNumber || '');
                    setMainEmail(response.data.contact.mainEmail || '');
                    setDivisions(response.data.divisions || []);
                } else {
                    setError('Invalid response format');
                }
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching contact information');
                setLoading(false);
            });
    }, []);

    const handleDivisionChange = (index, field, value) => {
        const newDivisions = [...divisions];
        newDivisions[index][field] = value;
        setDivisions(newDivisions);
    };

    const handleAddDivision = () => {
        setDivisions([...divisions, { name: '', personInCharge: '', phoneNumber: '', email: '' }]);
    };

    const handleRemoveDivision = (index) => {
        const newDivisions = divisions.filter((_, i) => i !== index);
        setDivisions(newDivisions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the contact information and divisions
        axios.post(`${config.apiBaseUrl}/contact`, { mainPhoneNumber, mainEmail, divisions })
            .then(response => {
                alert('Contact information updated successfully');
            })
            .catch(error => {
                setError('Error updating contact information');
            });
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel - Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        label="Main Phone Number"
                        variant="outlined"
                        fullWidth
                        value={mainPhoneNumber}
                        onChange={(e) => setMainPhoneNumber(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Main Email"
                        variant="outlined"
                        fullWidth
                        value={mainEmail}
                        onChange={(e) => setMainEmail(e.target.value)}
                    />
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    Divisions
                </Typography>
                {divisions.map((division, index) => (
                    <Box key={index} mb={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Division Name"
                                    variant="outlined"
                                    fullWidth
                                    value={division.name}
                                    onChange={(e) => handleDivisionChange(index, 'name', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Person In Charge"
                                    variant="outlined"
                                    fullWidth
                                    value={division.personInCharge}
                                    onChange={(e) => handleDivisionChange(index, 'personInCharge', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    value={division.phoneNumber}
                                    onChange={(e) => handleDivisionChange(index, 'phoneNumber', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={division.email}
                                    onChange={(e) => handleDivisionChange(index, 'email', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <IconButton onClick={() => handleRemoveDivision(index)} color="secondary">
                                    <Delete />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
                <Button variant="contained" color="primary" onClick={handleAddDivision} startIcon={<Add />}>
                    Add Division
                </Button>
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Update Contact Information
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default ContactUsAdmin;