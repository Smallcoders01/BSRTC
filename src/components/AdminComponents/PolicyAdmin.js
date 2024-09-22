import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import config from '../../config';
import { AuthContext } from '../../context/AuthContext';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Box, IconButton, Paper } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const PolicyAdmin = () => {
    const { user } = useContext(AuthContext);
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        // Fetch the current policies
        axios.get(`${config.apiBaseUrl}/policies`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data) {
                setPolicies(response.data);
            } else {
                setError('Invalid response format');
            }
            setLoading(false);
        })
        .catch(error => {
            setError('Error fetching policies');
            setLoading(false);
        });
    }, []);

    const handlePolicyChange = (index, field, value) => {
        const newPolicies = [...policies];
        newPolicies[index][field] = value;
        setPolicies(newPolicies);
    };

    const handleAddPolicy = () => {
        setPolicies([...policies, { name: '', content: '' }]);
    };

    const handleRemovePolicy = (index) => {
        const newPolicies = policies.filter((_, i) => i !== index);
        setPolicies(newPolicies);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        // Update the policies
        axios.put(`${config.apiBaseUrl}/policies`, { policies }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            alert('Policies updated successfully');
        })
        .catch(error => {
            setError('Error updating policies');
        });
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel - Policies
            </Typography>
            <form onSubmit={handleSubmit}>
                {policies.map((policy, policyIndex) => (
                    <Paper key={policy._id || policyIndex} sx={{ p: 2, mb: 2 }}>
                        <Box mb={2}>
                            <TextField
                                label="Policy Name"
                                variant="outlined"
                                fullWidth
                                value={policy.name}
                                onChange={(e) => handlePolicyChange(policyIndex, 'name', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Policy Content"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={policy.content}
                                onChange={(e) => handlePolicyChange(policyIndex, 'content', e.target.value)}
                            />
                        </Box>
                        <Box mt={2}>
                            <IconButton onClick={() => handleRemovePolicy(policyIndex)} color="secondary">
                                <Delete />
                            </IconButton>
                        </Box>
                    </Paper>
                ))}
                <Button variant="contained" color="primary" onClick={handleAddPolicy} startIcon={<Add />}>
                    Add Policy
                </Button>
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Update Policies
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default PolicyAdmin;