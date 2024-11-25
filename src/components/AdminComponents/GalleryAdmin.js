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
  const [newPhotoType, setNewPhotoType] = useState('CNG');
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState('');

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${config.apiBaseUrl}/gallery`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPhotos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Error fetching photos');
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setNewPhotoName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setNewPhotoType(e.target.value);
  };

  const handleAddPhoto = async () => {
    if (!newPhoto || !newPhotoName) {
      setError('Please fill in all fields');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', newPhotoName);
    formData.append('type', newPhotoType);
    formData.append('photo', newPhoto);

    try {
      const response = await axios.post(`${config.apiBaseUrl}/gallery`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      // Refresh the photos list after adding
      await fetchPhotos();
      
      // Reset form
      setNewPhoto(null);
      setNewPhotoName('');
      setNewPhotoType('CNG');
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Add error:', error);
      setError('Error adding photo');
    }
  };

  const handleEditClick = (photo) => {
    setEditingPhoto(photo);
    setEditName(photo.name);
    setEditType(photo.type);
  };

  const handleCancelEdit = () => {
    setEditingPhoto(null);
    setEditName('');
    setEditType('');
  };

  const handleUpdatePhoto = async () => {
    if (!editName || !editType) {
      setError('Please fill in all fields');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', editName);
    formData.append('type', editType);

    try {
      await axios.put(
        `${config.apiBaseUrl}/gallery/${editingPhoto._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Refresh the photos list after updating
      await fetchPhotos();
      handleCancelEdit();
    } catch (error) {
      console.error('Update error:', error);
      setError('Error updating photo');
    }
  };

  const handleDeletePhoto = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${config.apiBaseUrl}/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh the photos list after deleting
      await fetchPhotos();
    } catch (error) {
      console.error('Delete error:', error);
      setError('Error deleting photo');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Panel - Gallery
      </Typography>
      
      {/* Add Photo Form */}
      <Box mb={4} sx={{ 
        display: 'flex', 
        gap: 2, 
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 2,
        borderRadius: 1
      }}>
        <input
          type="text"
          placeholder="Photo Name"
          value={newPhotoName}
          onChange={handleNameChange}
          style={{ 
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '200px'
          }}
        />
        <select 
          value={newPhotoType}
          onChange={handleTypeChange}
          style={{ 
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '150px'
          }}
        >
          <option value="CNG  ">CNG</option>
          <option value="Volvo">VOLVO</option>
          <option value="EV">EV</option>
        </select>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{
            padding: '4px'
          }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddPhoto} 
          startIcon={<Add />}
          disabled={!newPhoto || !newPhotoName}
        >
          Add Photo
        </Button>
      </Box>

      {/* Photo Grid */}
      <Grid container spacing={2}>
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo._id}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ position: 'relative', paddingTop: '75%', mb: 2 }}>
                <img 
                  src={`${config.baseUrl}${photo.photo}`} 
                  alt={photo.name} 
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }} 
                />
              </Box>
              
              {editingPhoto?._id === photo._id ? (
                // Edit Mode
                <Box>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={{ 
                      width: '100%', 
                      marginBottom: '8px', 
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  />
                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                    style={{ 
                      width: '100%', 
                      marginBottom: '8px', 
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  >
                    <option value="CNG">CNG BUS</option>
                    <option value="Volvo">VOLVO</option>
                    <option value="EV">EV</option>
                  </select>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Button 
                      size="small" 
                      onClick={handleCancelEdit}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="small" 
                      variant="contained" 
                      onClick={handleUpdatePhoto}
                      disabled={!editName}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              ) : (
                // View Mode
                <Box>
                  <Typography variant="subtitle1">{photo.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Type: {photo.type}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Button 
                      size="small" 
                      onClick={() => handleEditClick(photo)}
                      variant="outlined"
                    >
                      Edit
                    </Button>
                    <IconButton 
                      onClick={() => handleDeletePhoto(photo._id)} 
                      color="error"
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GalleryAdmin;