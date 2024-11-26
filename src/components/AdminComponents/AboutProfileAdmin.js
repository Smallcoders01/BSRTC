import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Box, IconButton, Paper } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const AboutProfileAdmin = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchProfiles = async () => {
            try {
                const [engResponse, hindiResponse] = await Promise.all([
                    axios.get(`${config.apiBaseUrl}/about-profile/english`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get(`${config.apiBaseUrl}/about-profile/hindi`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);
                const combinedProfiles = engResponse.data.map((engProfile, index) => ({
                    ...engProfile,
                    titleHi: hindiResponse.data[index]?.title || '',
                    nameHi: hindiResponse.data[index]?.name || '',
                }));
                setProfiles(combinedProfiles);
                setLoading(false);
            } catch {
                setError('Error fetching about profiles');
                setLoading(false);
            }
        };
        fetchProfiles();
    }, []);

    const handleProfileChange = (index, field, value) => {
        const newProfiles = [...profiles];
        newProfiles[index][field] = value;
        setProfiles(newProfiles);
    };

    const handleFileChange = (index, file) => {
        const newProfiles = [...profiles];
        newProfiles[index].file = file;
        setProfiles(newProfiles);
    };

    const handleRemoveProfile = (index) => {
        const token = localStorage.getItem('token');
        const profileId = profiles[index].id;
        if (!profileId) {
            setError('Profile ID is undefined');
            return;
        }
        axios.delete(`${config.apiBaseUrl}/about-profile/${profileId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                const newProfiles = profiles.filter((_, i) => i !== index);
                setProfiles(newProfiles);
                alert('Profile deleted successfully');
            })
            .catch(() => {
                setError('Error deleting profile');
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        profiles.forEach(profile => {
            const formData = new FormData();
            formData.append('titleEn', profile.title);
            formData.append('nameEn', profile.name);
            formData.append('titleHi', profile.titleHi);
            formData.append('nameHi', profile.nameHi);
            if (profile.file) {
                formData.append('photo', profile.file);
            }

            const url = profile.id ? `${config.apiBaseUrl}/about-profile/${profile.id}` : `${config.apiBaseUrl}/about-profile`;
            const method = profile.id ? 'put' : 'post';
            axios[method](url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    alert('About profiles updated successfully');
                    setProfiles(prevProfiles => {
                        const updatedProfiles = [...prevProfiles];
                        const index = updatedProfiles.findIndex(p => p.id === profile.id);
                        if (index !== -1) {
                            updatedProfiles[index] = response.data;
                        } else {
                            updatedProfiles.push(response.data);
                        }
                        return updatedProfiles;
                    });
                })
                .catch(() => {
                    setError('Error updating about profiles');
                });
        });
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel - About Profiles
            </Typography>
            <form onSubmit={handleSubmit}>
                {profiles.map((profile, profileIndex) => (
                    <Paper key={profile.id || profileIndex} sx={{ p: 2, mb: 2 }}>
                        <Box mb={2}>
                            <TextField
                                label="Title (English)"
                                variant="outlined"
                                fullWidth
                                value={profile.title || ''}
                                onChange={(e) => handleProfileChange(profileIndex, 'title', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Name (English)"
                                variant="outlined"
                                fullWidth
                                value={profile.name || ''}
                                onChange={(e) => handleProfileChange(profileIndex, 'name', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Title (Hindi)"
                                variant="outlined"
                                fullWidth
                                value={profile.titleHi || ''}
                                onChange={(e) => handleProfileChange(profileIndex, 'titleHi', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Name (Hindi)"
                                variant="outlined"
                                fullWidth
                                value={profile.nameHi || ''}
                                onChange={(e) => handleProfileChange(profileIndex, 'nameHi', e.target.value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(profileIndex, e.target.files[0])}
                            />
                        </Box>
                        <Box mb={2}>
                            {profile.photos && profile.photos.map((photo, idx) => (
                                <img
                                    key={idx}
                                    src={`${config.apiBaseUrl}${photo}`}
                                    alt={`Profile ${idx}`}
                                    style={{ width: '100px', height: '100px', marginRight: '10px' }}
                                />
                            ))}
                        </Box>
                        <Box mt={2}>
                            <IconButton onClick={() => handleRemoveProfile(profileIndex)} color="secondary">
                                <Delete />
                            </IconButton>
                        </Box>
                    </Paper>
                ))}
                <Button variant="contained" color="primary" onClick={() => setProfiles([...profiles, { title: '', name: '', titleHi: '', nameHi: '', file: null }])} startIcon={<Add />}>
                    Add Profile
                </Button>
                <Box mt={3}>
                    <Button variant="contained" color="primary" type="submit">
                        Update Profiles
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default AboutProfileAdmin;