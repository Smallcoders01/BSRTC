import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Box, Grid, IconButton, Paper } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const PhoneDirectoryAdmin = () => {
    const [divisions, setDivisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchDivisions();
    }, []);

    const fetchDivisions = async () => {
        const token = localStorage.getItem('token');
        try {
            const responseEn = await axios.get(`${config.apiBaseUrl}/phone-directory/en`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const responseHi = await axios.get(`${config.apiBaseUrl}/phone-directory/hi`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (responseEn.data && Array.isArray(responseEn.data) && 
                responseHi.data && Array.isArray(responseHi.data)) {
                
                const formattedDivisions = responseEn.data.map((divisionEn, index) => {
                    const divisionHi = responseHi.data[index];
                    return {
                        _id: divisionEn._id,
                        nameEn: divisionEn.name,
                        nameHi: divisionHi.name,
                        officers: divisionEn.officers.map((officerEn, officerIndex) => {
                            const officerHi = divisionHi.officers[officerIndex];
                            return {
                                _id: officerEn._id,
                                nameEn: officerEn.name,
                                nameHi: officerHi.name,
                                designationEn: officerEn.designation,
                                designationHi: officerHi.designation,
                                officeEn: officerEn.office,
                                officeHi: officerHi.office,
                                phoneNumber: officerEn.phoneNumber,
                                email: officerEn.email
                            };
                        })
                    };
                });
                
                setDivisions(formattedDivisions);
            }
            setLoading(false);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Error fetching divisions: ' + err.message);
            setLoading(false);
        }
    };

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
        setDivisions([...divisions, {
            nameEn: '',
            nameHi: '',
            officers: [{
                nameEn: '',
                nameHi: '',
                designationEn: '',
                designationHi: '',
                officeEn: '',
                officeHi: '',
                phoneNumber: '',
                email: ''
            }]
        }]);
    };

    const handleAddOfficer = (divisionIndex) => {
        const newDivisions = [...divisions];
        newDivisions[divisionIndex].officers.push({
            nameEn: '',
            nameHi: '',
            designationEn: '',
            designationHi: '',
            officeEn: '',
            officeHi: '',
            phoneNumber: '',
            email: ''
        });
        setDivisions(newDivisions);
    };

    const handleRemoveDivision = async (index) => {
        const token = localStorage.getItem('token');
        const divisionId = divisions[index]._id;

        if (!divisionId) {
            const newDivisions = divisions.filter((_, i) => i !== index);
            setDivisions(newDivisions);
            return;
        }

        try {
            await axios.delete(`${config.apiBaseUrl}/phone-directory/${divisionId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchDivisions();
            setSuccessMessage('Division deleted successfully');
        } catch (error) {
            setError('Error deleting division: ' + error.message);
        }
    };

    const handleRemoveOfficer = (divisionIndex, officerIndex) => {
        const newDivisions = [...divisions];
        newDivisions[divisionIndex].officers = newDivisions[divisionIndex].officers.filter((_, i) => i !== officerIndex);
        setDivisions(newDivisions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const formattedData = divisions.map(division => ({
                _id: division._id,
                nameEn: division.nameEn,
                nameHi: division.nameHi,
                officers: division.officers.map(officer => ({
                    _id: officer._id,
                    nameEn: officer.nameEn,
                    nameHi: officer.nameHi,
                    designationEn: officer.designationEn,
                    designationHi: officer.designationHi,
                    officeEn: officer.officeEn,
                    officeHi: officer.officeHi,
                    phoneNumber: officer.phoneNumber,
                    email: officer.email
                }))
            }));

            const response = await axios.put(
                `${config.apiBaseUrl}/phone-directory`,
                { divisions: formattedData },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data) {
                setSuccessMessage('Phone directory updated successfully');
                await fetchDivisions();
            }
        } catch (error) {
            console.error('Submit error:', error);
            setError('Error updating phone directory: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel - Phone Directory
            </Typography>

            {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {successMessage}
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {loading && (
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress />
                </Box>
            )}

            <form onSubmit={handleSubmit}>
                {divisions.map((division, divisionIndex) => (
                    <Paper key={division._id || divisionIndex} sx={{ p: 2, mb: 2 }}>
                        <Box mb={2}>
                            <TextField
                                label="Division Name (English)"
                                variant="outlined"
                                fullWidth
                                value={division.nameEn || ''}
                                onChange={(e) => handleDivisionChange(divisionIndex, 'nameEn', e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                label="Division Name (Hindi)"
                                variant="outlined"
                                fullWidth
                                value={division.nameHi || ''}
                                onChange={(e) => handleDivisionChange(divisionIndex, 'nameHi', e.target.value)}
                                margin="normal"
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
                                            label="Officer Name (English)"
                                            variant="outlined"
                                            fullWidth
                                            value={officer.nameEn}
                                            onChange={(e) => handleOfficerChange(divisionIndex, officerIndex, 'nameEn', e.target.value)}
                                        />
                                        <TextField
                                            label="Officer Name (Hindi)"
                                            variant="outlined"
                                            fullWidth
                                            value={officer.nameHi}
                                            onChange={(e) => handleOfficerChange(divisionIndex, officerIndex, 'nameHi', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Designation (English)"
                                            variant="outlined"
                                            fullWidth
                                            value={officer.designationEn}
                                            onChange={(e) => handleOfficerChange(divisionIndex, officerIndex, 'designationEn', e.target.value)}
                                        />
                                        <TextField
                                            label="Designation (Hindi)"
                                            variant="outlined"
                                            fullWidth
                                            value={officer.designationHi}
                                            onChange={(e) => handleOfficerChange(divisionIndex, officerIndex, 'designationHi', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Office (English)"
                                            variant="outlined"
                                            fullWidth
                                            value={officer.officeEn}
                                            onChange={(e) => handleOfficerChange(divisionIndex, officerIndex, 'officeEn', e.target.value)}
                                        />
                                        <TextField
                                            label="Office (Hindi)"
                                            variant="outlined"
                                            fullWidth
                                            value={officer.officeHi}
                                            onChange={(e) => handleOfficerChange(divisionIndex, officerIndex, 'officeHi', e.target.value)}
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