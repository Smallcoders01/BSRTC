import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Box, IconButton, Paper } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const DepotAdmin = () => {
    const [depots, setDepots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchDepots();
    }, []);

    const fetchDepots = async () => {
        const token = localStorage.getItem('token');
        const language = localStorage.getItem('language') || 'en';

        try {
            const response = await axios.get(`${config.apiBaseUrl}/depots/${language}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.data && Array.isArray(response.data)) {
                setDepots(response.data);
            }
            setLoading(false);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Error fetching depots: ' + err.message);
            setLoading(false);
        }
    };

    const handleDepotChange = (index, field, value) => {
        const newDepots = [...depots];
        newDepots[index][field] = value;
        setDepots(newDepots);
    };

    const handleAddDepot = () => {
        setDepots([...depots, {
            nameEn: '',
            nameHi: '',
            personInChargeEn: '',
            personInChargeHi: '',
            phoneNumber: '',
            email: ''
        }]);
    };

    const handleRemoveDepot = async (index) => {
        const token = localStorage.getItem('token');
        const depotId = depots[index]._id;

        if (!depotId) {
            const newDepots = depots.filter((_, i) => i !== index);
            setDepots(newDepots);
            return;
        }

        try {
            await axios.delete(`${config.apiBaseUrl}/depots/${depotId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchDepots();
            setSuccessMessage('Depot deleted successfully');
        } catch (error) {
            setError('Error deleting depot: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            for (const depot of depots) {
                if (depot._id) {
                    await axios.put(
                        `${config.apiBaseUrl}/depots/${depot._id}`,
                        depot,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                } else {
                    await axios.post(
                        `${config.apiBaseUrl}/depots`,
                        depot,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    );
                }
            }
            setSuccessMessage('Depots updated successfully');
            await fetchDepots();
        } catch (error) {
            console.error('Submit error:', error);
            setError('Error updating depots: ' + error.message);
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
                Admin Panel - Depots
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
                {depots.map((depot, index) => (
                    <Paper key={depot._id || index} sx={{ p: 2, mb: 2 }}>
                        <Box mb={2}>
                            <TextField
                                label="Depot Name (English)"
                                variant="outlined"
                                fullWidth
                                value={depot.nameEn || ''}
                                onChange={(e) => handleDepotChange(index, 'nameEn', e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Depot Name (Hindi)"
                                variant="outlined"
                                fullWidth
                                value={depot.nameHi || ''}
                                onChange={(e) => handleDepotChange(index, 'nameHi', e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Person In Charge (English)"
                                variant="outlined"
                                fullWidth
                                value={depot.personInChargeEn || ''}
                                onChange={(e) => handleDepotChange(index, 'personInChargeEn', e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Person In Charge (Hindi)"
                                variant="outlined"
                                fullWidth
                                value={depot.personInChargeHi || ''}
                                onChange={(e) => handleDepotChange(index, 'personInChargeHi', e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                value={depot.phoneNumber || ''}
                                onChange={(e) => handleDepotChange(index, 'phoneNumber', e.target.value)}
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={depot.email || ''}
                                onChange={(e) => handleDepotChange(index, 'email', e.target.value)}
                                margin="normal"
                                required
                                type="email"
                            />
                        </Box>
                        <Box mt={2}>
                            <IconButton onClick={() => handleRemoveDepot(index)} color="secondary">
                                <Delete />
                            </IconButton>
                        </Box>
                    </Paper>
                ))}
                <Button variant="contained" color="primary" onClick={handleAddDepot} startIcon={<Add />}>
                    Add Depot
                </Button>
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Update Depots
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default DepotAdmin;