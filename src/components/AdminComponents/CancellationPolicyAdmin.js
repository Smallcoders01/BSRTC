import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  Button,
  List,
  ListItem,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import config from '../../config';

const CancellationPolicyAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [policies, setPolicies] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    titleEn: '',
    contentEn: '',
    titleHi: '',
    contentHi: ''
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        `${config.apiBaseUrl}/cancellation-policy`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setPolicies(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching policies');
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${config.apiBaseUrl}/cancellation-policy`,
        currentItem,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setPolicies([...policies, response.data]);
      setCurrentItem({
        titleEn: '',
        contentEn: '',
        titleHi: '',
        contentHi: ''
      });
      setShowForm(false);
      alert('Cancellation Policy added successfully');
    } catch (err) {
      setError('Error adding policy');
    }
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `${config.apiBaseUrl}/cancellation-policy/${id}`,
        currentItem,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setPolicies(policies.map(policy => 
        policy._id === id ? response.data : policy
      ));
      setCurrentItem({
        titleEn: '',
        contentEn: '',
        titleHi: '',
        contentHi: ''
      });
      setShowForm(false);
      alert('Cancellation Policy updated successfully');
    } catch (err) {
      setError('Error updating policy');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `${config.apiBaseUrl}/cancellation-policy/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setPolicies(policies.filter(policy => policy._id !== id));
      alert('Cancellation Policy deleted successfully');
    } catch (err) {
      setError('Error deleting policy');
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditMode(true);
    setShowForm(true);
  };

  const handleAddNewClick = () => {
    setEditMode(false);
    setCurrentItem({
      titleEn: '',
      contentEn: '',
      titleHi: '',
      contentHi: ''
    });
    setShowForm(true);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4 }}>Cancellation Policy Management</Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddNewClick}
        sx={{ 
          mb: 3,
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0'
          }
        }}
      >
        ADD NEW
      </Button>

      {showForm && (
        <Box sx={{ 
          mb: 4, 
          p: 3, 
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#fff'
        }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {editMode ? 'Edit Policy' : 'Add New Policy'}
          </Typography>
          
          <Box mb={3}>
            <Typography sx={{ mb: 1 }}>English Title</Typography>
            <input
              type="text"
              value={currentItem.titleEn}
              onChange={(e) => setCurrentItem({ ...currentItem, titleEn: e.target.value })}
              style={{ 
                width: '100%', 
                padding: '10px',
                marginBottom: '20px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            
            <Typography sx={{ mb: 1 }}>English Content</Typography>
            <textarea
              value={currentItem.contentEn}
              onChange={(e) => setCurrentItem({ ...currentItem, contentEn: e.target.value })}
              style={{ 
                width: '100%',
                minHeight: '200px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </Box>

          <Box mb={3}>
            <Typography sx={{ mb: 1 }}>Hindi Title</Typography>
            <input
              type="text"
              value={currentItem.titleHi}
              onChange={(e) => setCurrentItem({ ...currentItem, titleHi: e.target.value })}
              style={{ 
                width: '100%',
                padding: '10px',
                marginBottom: '20px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            
            <Typography sx={{ mb: 1 }}>Hindi Content</Typography>
            <textarea
              value={currentItem.contentHi}
              onChange={(e) => setCurrentItem({ ...currentItem, contentHi: e.target.value })}
              style={{ 
                width: '100%',
                minHeight: '200px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained"
              onClick={() => {
                if (editMode) {
                  handleUpdate(currentItem._id);
                } else {
                  handleAdd();
                }
              }}
              sx={{ mr: 2 }}
            >
              {editMode ? 'Update' : 'Save'}
            </Button>
            <Button 
              variant="outlined"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      <List sx={{ bgcolor: 'background.paper' }}>
        {policies.map((policy) => (
          <ListItem
            key={policy._id}
            sx={{ 
              mb: 2, 
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#f5f5f5'
              }
            }}
            secondaryAction={
              <Box>
                <IconButton onClick={() => handleEdit(policy)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(policy._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {policy.titleEn}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {policy.contentEn.substring(0, 100)}...
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CancellationPolicyAdmin; 