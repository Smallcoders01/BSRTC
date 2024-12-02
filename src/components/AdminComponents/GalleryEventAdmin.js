import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress, 
  Alert, 
  Box, 
  IconButton, 
  Paper,
  Grid,
  ImageList,
  ImageListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Add, Delete, Edit, AddPhotoAlternate } from '@mui/icons-material';

const GalleryEventAdmin = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newEvent, setNewEvent] = useState({ category: '', files: [] });
  const [editMode, setEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [additionalPhotos, setAdditionalPhotos] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${config.apiBaseUrl}/gallery-events`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching gallery events');
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    if (editMode) {
      setSelectedEvent({ ...selectedEvent, category: e.target.value });
    } else {
      setNewEvent({ ...newEvent, category: e.target.value });
    }
  };

  const handleFileChange = (e) => {
    if (editMode) {
      setAdditionalPhotos(Array.from(e.target.files));
    } else {
      setNewEvent({ ...newEvent, files: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();

    if (editMode) {
      formData.append('category', selectedEvent.category);
      additionalPhotos.forEach(file => {
        formData.append('photos', file);
      });

      try {
        await axios.put(`${config.apiBaseUrl}/gallery-events/${selectedEvent._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
        alert('Gallery event updated successfully');
        setEditMode(false);
        setSelectedEvent(null);
        setAdditionalPhotos([]);
      } catch (error) {
        setError('Error updating gallery event');
      }
    } else {
      formData.append('category', newEvent.category);
      newEvent.files.forEach(file => {
        formData.append('photos', file);
      });

      try {
        await axios.post(`${config.apiBaseUrl}/gallery-events`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
        alert('Gallery event created successfully');
        setNewEvent({ category: '', files: [] });
      } catch (error) {
        setError('Error creating gallery event');
      }
    }
    fetchEvents();
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDeletePhoto = async (eventId, photoIndex) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${config.apiBaseUrl}/gallery-events/${eventId}/photos/${photoIndex}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEvents();
    } catch (error) {
      setError('Error deleting photo');
    }
  };

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${config.apiBaseUrl}/gallery-events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Gallery event deleted successfully');
      fetchEvents();
    } catch (error) {
      setError('Error deleting gallery event');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMode(false);
    setSelectedEvent(null);
    setAdditionalPhotos([]);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Gallery Events Management
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add New Gallery Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={newEvent.category}
                onChange={handleCategoryChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
                id="photo-input"
              />
              <label htmlFor="photo-input">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<AddPhotoAlternate />}
                >
                  Select Photos
                </Button>
              </label>
              {newEvent.files.length > 0 && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {newEvent.files.length} photos selected
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<Add />}
              >
                Create Gallery Event
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Existing Gallery Events
      </Typography>
      {events.map((event) => (
        <Paper key={event._id} sx={{ p: 3, mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">{event.category}</Typography>
            <Box>
              <IconButton onClick={() => handleEdit(event)} color="primary">
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(event._id)} color="error">
                <Delete />
              </IconButton>
            </Box>
          </Box>
          <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} rowHeight={200}>
            {event.photos.map((photo, index) => (
              <ImageListItem key={index}>
                <img
                  src={`${config.baseUrl}${photo}`}
                  alt={`Gallery item ${index + 1}`}
                  loading="lazy"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '0 0 0 4px'
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleDeletePhoto(event._id, index)}
                    sx={{ color: 'white' }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        </Paper>
      ))}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Edit Gallery Event</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={selectedEvent?.category || ''}
                onChange={handleCategoryChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
                id="edit-photo-input"
              />
              <label htmlFor="edit-photo-input">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<AddPhotoAlternate />}
                >
                  Add More Photos
                </Button>
              </label>
              {additionalPhotos.length > 0 && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {additionalPhotos.length} new photos selected
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GalleryEventAdmin; 