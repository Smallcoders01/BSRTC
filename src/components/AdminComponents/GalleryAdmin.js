import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Container, Typography, Button, CircularProgress, Alert, Box, Grid, IconButton, Paper } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const GalleryAdmin = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPhoto, setNewPhoto] = useState(null);
  const [newPhotoName, setNewPhotoName] = useState('');

  useEffect(() => {
    // Fetch the current photos
    axios.get(`${config.apiBaseUrl}/gallery`)
      .then(response => {
        setPhotos(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching photos');
        setLoading(false);
      });
  }, []);

  const handleFileChange = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setNewPhotoName(e.target.value);
  };

  const handleAddPhoto = () => {
    const formData = new FormData();
    formData.append('name', newPhotoName);
    formData.append('photo', newPhoto);

    axios.post(`${config.apiBaseUrl}/gallery`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setPhotos([...photos, response.data]);
        setNewPhoto(null);
        setNewPhotoName('');
      })
      .catch(error => {
        setError('Error adding photo');
      });
  };

  const handleDeletePhoto = (id) => {
    axios.delete(`${config.apiBaseUrl}/gallery/${id}`)
      .then(response => {
        setPhotos(photos.filter(photo => photo._id !== id));
      })
      .catch(error => {
        setError('Error deleting photo');
      });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Panel - Gallery
      </Typography>
      <Box mb={2}>
        <input
          type="text"
          placeholder="Photo Name"
          value={newPhotoName}
          onChange={handleNameChange}
        />
        <input
          type="file"
          onChange={handleFileChange}
        />
        <Button variant="contained" color="primary" onClick={handleAddPhoto} startIcon={<Add />}>
          Add Photo
        </Button>
      </Box>
      <Grid container spacing={2}>
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo._id}>
            <Paper sx={{ p: 2 }}>
              <img src={`http://localhost:5000${photo.photo}`} alt={photo.name} style={{ width: '100%', height: 'auto' }} />
              <Typography variant="subtitle1">{photo.name}</Typography>
              <IconButton onClick={() => handleDeletePhoto(photo._id)} color="secondary">
                <Delete />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GalleryAdmin;