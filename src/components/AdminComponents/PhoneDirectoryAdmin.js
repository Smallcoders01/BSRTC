import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Box, Grid, IconButton, Paper } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const PhoneDirectoryAdmin = () => {
    const [divisions, setDivisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        // Fetch the current divisions
        axios.get(`${config.apiBaseUrl}/phone-directory`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                if (response.data) {
                    setDivisions(response.data);
                } else {
                    setError('Invalid response format');
                }
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching divisions');
                setLoading(false);
            });
    }, []);

    const handleDivisionChange = (index, field, value) => {
        const newDivisions = [...divisions];
        newDivisions[index][field] = value;
        setDivisions(newDivisions);
    };

    const handleOfficerChange = (divisionIndex, officerIndex, field, value) => {
        const newDivisions = [...divisions];
        newDivisions[divisionIndex].officers[officerIndex][field] = value;
        setDivisions(newDivisions);
    };

    const handleAddDivision = () => {
        setDivisions([...divisions, { name: '', officers: [{ name: '', designation: '', office: '', phoneNumber: '', email: '' }] }]);
    };

    const handleAddOfficer = (divisionIndex) => {
        const newDivisions = [...divisions];
        newDivisions[divisionIndex].officers.push({ name: '', designation: '', office: '', phoneNumber: '', email: '' });
        setDivisions(newDivisions);
    };

    const handleRemoveDivision = (index) => {
        const token = localStorage.getItem('token');
        const divisionId = divisions[index]._id;
        axios.delete(`${config.apiBaseUrl}/phone-directory/${divisionId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                const newDivisions = divisions.filter((_, i) => i !== index);
                setDivisions(newDivisions);
                alert('Division deleted successfully');
            })
            .catch(error => {
                setError('Error deleting division');
            });
    };

    const handleRemoveOfficer = (divisionIndex, officerIndex) => {
        const newDivisions = [...divisions];
        newDivisions[divisionIndex].officers = newDivisions[divisionIndex].officers.filter((_, i) => i !== officerIndex);
        setDivisions(newDivisions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        // Update the divisions
        axios.put(`${config.apiBaseUrl}/phone-directory`, { divisions }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                alert('Phone directory updated successfully');
            })
            .catch(error => {
                setError('Error updating phone directory');
            });
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel - Phone Directory
            </Typography>
            <form onSubmit={handleSubmit}>
                {divisions.map((division, divisionIndex) => (
                    <Paper key={division._id || divisionIndex} sx={{ p: 2, mb: 2 }}>
                        <Box mb={2}>
                            <TextField
                                label="Division Name"
                                variant="outlined"
                                fullWidth
                                value={division.name}
                                onChange={(e) => handleDivisionChange(divisionIndex, 'name', e.target.value)}
                            />
                        </Box>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Officers
                        </Typography>
                        {division.officers.map((officer, officerIndex) => (
                            <Box key={officerIndex} mb={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Officer Name"
                                            variant="outlined"
                                            fullWidth
                                            value={officer.name}
                                            onChange={(e) => handleOfficerChange(divisionIndex, officerIndex, 'name', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Designation"
                                            variant="outlined"
                                            fullWidth
                                            value={officer.designation}
                                            onChange={(e) => handleOfficerChange(divisionIndex, officerIndex, 'designation', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Office"
                                            variant="outlined"
                                            fullWidth
                                            value={officer.office}
                                            onChange={(e) => handleOfficerChange(divisionIndex, officerIndex, 'office', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Phone Number"
                                            variant="outlined"
                                            fullWidth
                                            value={officer.phoneNumber}
                                            onChange={(e) => handleOfficerChange(divisionIndex, officerIndex, 'phoneNumber', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
                                            value={officer.email}
                                            onChange={(e) => handleOfficerChange(divisionIndex, officerIndex, 'email', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <IconButton onClick={() => handleRemoveOfficer(divisionIndex, officerIndex)} color="secondary">
                                            <Delete />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                        <Button variant="contained" color="primary" onClick={() => handleAddOfficer(divisionIndex)} startIcon={<Add />}>
                            Add Officer
                        </Button>
                        <Box mt={2}>
                            <IconButton onClick={() => handleRemoveDivision(divisionIndex)} color="secondary">
                                <Delete />
                            </IconButton>
                        </Box>
                    </Paper>
                ))}
                <Button variant="contained" color="primary" onClick={handleAddDivision} startIcon={<Add />}>
                    Add Division
                </Button>
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Update Phone Directory
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default PhoneDirectoryAdmin;