import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Box, Grid, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const ContactUsAdmin = () => {
    const [mainEmail, setMainEmail] = useState('');
    const [phoneNumber1, setPhoneNumber1] = useState('');
    const [phoneNumber2, setPhoneNumber2] = useState('');
    const [divisions, setDivisions] = useState([]);
    const initialDivisionState = {
        nameEn: '',
        nameHi: '',
        personInChargeEn: '',
        personInChargeHi: '',
        phoneNumber: '',
        email: ''
    };
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [contactInfoId, setContactInfoId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            setLoading(true);
            try {
                // Fetch contact info
                const contactResponse = await axios.get(`${config.apiBaseUrl}/contact-info`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if (contactResponse.data.length > 0) {
                    const contactInfo = contactResponse.data[0];
                    setContactInfoId(contactInfo._id);
                    setMainEmail(contactInfo.email || '');
                    setPhoneNumber1(contactInfo.phoneNumber1 || '');
                    setPhoneNumber2(contactInfo.phoneNumber2 || '');
                }

                // Fetch both English and Hindi divisions
                const [enResponse, hiResponse] = await Promise.all([
                    axios.get(`${config.apiBaseUrl}/divisions/en`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get(`${config.apiBaseUrl}/divisions/hi`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                // Combine English and Hindi data
                const combinedDivisions = enResponse.data.map((divEn, index) => {
                    const divHi = hiResponse.data[index];
                    return {
                        _id: divEn.id,
                        nameEn: divEn.name,
                        nameHi: divHi.name,
                        personInChargeEn: divEn.personInCharge,
                        personInChargeHi: divHi.personInCharge,
                        phoneNumber: divEn.phoneNumber,
                        email: divEn.email
                    };
                });

                setDivisions(combinedDivisions);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        setLoading(true);

        try {
            // Update contact info
            await axios.put(
                `${config.apiBaseUrl}/contact-info/${contactInfoId}`,
                { email: mainEmail, phoneNumber1, phoneNumber2 },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Update divisions
            for (const division of divisions) {
                const divisionData = {
                    nameEn: division.nameEn,
                    nameHi: division.nameHi,
                    personInChargeEn: division.personInChargeEn,
                    personInChargeHi: division.personInChargeHi,
                    phoneNumber: division.phoneNumber,
                    email: division.email
                };

                if (division._id) {
                    await axios.put(
                        `${config.apiBaseUrl}/divisions/${division._id}`,
                        divisionData,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                } else {
                    await axios.post(
                        `${config.apiBaseUrl}/divisions`,
                        divisionData,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                }
            }

            alert('Contact information updated successfully');
            // Refresh data after update
            window.location.reload();
        } catch (error) {
            console.error('Error updating data:', error);
            setError('Error updating data');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveDivision = async (index) => {
        const token = localStorage.getItem('token');
        const divisionId = divisions[index]._id;

        try {
            await axios.delete(`${config.apiBaseUrl}/divisions/${divisionId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const newDivisions = divisions.filter((_, i) => i !== index);
            setDivisions(newDivisions);
            alert('Division deleted successfully');
        } catch (error) {
            console.error('Error deleting division:', error);
            setError('Error deleting division');
        }
    };

    const handleDivisionChange = (index, field, value) => {
        const newDivisions = [...divisions];
        newDivisions[index][field] = value;
        setDivisions(newDivisions);
    };

    const handleAddDivision = () => {
        setDivisions([...divisions, initialDivisionState]);
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
                        label="Main Email"
                        variant="outlined"
                        fullWidth
                        value={mainEmail}
                        onChange={(e) => setMainEmail(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Phone Number 1"
                        variant="outlined"
                        fullWidth
                        value={phoneNumber1}
                        onChange={(e) => setPhoneNumber1(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Phone Number 2"
                        variant="outlined"
                        fullWidth
                        value={phoneNumber2}
                        onChange={(e) => setPhoneNumber2(e.target.value)}
                    />
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    Divisions
                </Typography>
                {divisions.map((division, index) => (
                    <Box key={index} mb={4} p={2} border={1} borderColor="grey.300" borderRadius={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Division {index + 1}
                                </Typography>
                            </Grid>
                            
                            {/* English Fields */}
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="primary">
                                    English Details
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Division Name (English)"
                                    variant="outlined"
                                    fullWidth
                                    value={division.nameEn}
                                    onChange={(e) => handleDivisionChange(index, 'nameEn', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Person In Charge (English)"
                                    variant="outlined"
                                    fullWidth
                                    value={division.personInChargeEn}
                                    onChange={(e) => handleDivisionChange(index, 'personInChargeEn', e.target.value)}
                                />
                            </Grid>

                            {/* Hindi Fields */}
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="primary">
                                    Hindi Details
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Division Name (Hindi)"
                                    variant="outlined"
                                    fullWidth
                                    value={division.nameHi}
                                    onChange={(e) => handleDivisionChange(index, 'nameHi', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Person In Charge (Hindi)"
                                    variant="outlined"
                                    fullWidth
                                    value={division.personInChargeHi}
                                    onChange={(e) => handleDivisionChange(index, 'personInChargeHi', e.target.value)}
                                />
                            </Grid>

                            {/* Common Fields */}
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
                                <IconButton 
                                    onClick={() => handleRemoveDivision(index)} 
                                    color="secondary"
                                    aria-label="delete division"
                                >
                                    <Delete />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleAddDivision} 
                    startIcon={<Add />}
                    sx={{ mb: 2 }}
                >
                    Add Division
                </Button>
                <Box mt={3}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        size="large"
                    >
                        Update Contact Information
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default ContactUsAdmin;