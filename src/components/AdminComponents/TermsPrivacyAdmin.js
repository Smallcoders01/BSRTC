import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert, 
  Tabs, 
  Tab, 
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

const TermsPrivacyAdmin = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [termsItems, setTermsItems] = useState([]);
  const [privacyItems, setPrivacyItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    titleEn: '',
    contentEn: '',
    titleHi: '',
    contentHi: ''
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const [termsRes, privacyRes] = await Promise.all([
        axios.get(`${config.apiBaseUrl}/terms`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${config.apiBaseUrl}/privacy`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setTermsItems(termsRes.data);
      setPrivacyItems(privacyRes.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  const handleAdd = async (type) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${config.apiBaseUrl}/${type}`, 
        currentItem,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (type === 'terms') {
        setTermsItems([...termsItems, response.data]);
      } else {
        setPrivacyItems([...privacyItems, response.data]);
      }
      setCurrentItem({
        titleEn: '',
        contentEn: '',
        titleHi: '',
        contentHi: ''
      });
      setShowForm(false);
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`);
    } catch (err) {
      setError('Error adding item');
    }
  };

  const handleUpdate = async (type, id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `${config.apiBaseUrl}/${type}/${id}`, 
        currentItem,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (type === 'terms') {
        setTermsItems(termsItems.map(item => item._id === id ? response.data : item));
      } else {
        setPrivacyItems(privacyItems.map(item => item._id === id ? response.data : item));
      }
      setCurrentItem({
        titleEn: '',
        contentEn: '',
        titleHi: '',
        contentHi: ''
      });
      setShowForm(false);
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`);
    } catch (err) {
      setError('Error updating item');
    }
  };

  const handleDelete = async (type, id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `${config.apiBaseUrl}/${type}/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (type === 'terms') {
        setTermsItems(termsItems.filter(item => item._id !== id));
      } else {
        setPrivacyItems(privacyItems.filter(item => item._id !== id));
      }
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
    } catch (err) {
      setError('Error deleting item');
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditMode(true);
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
      <Typography variant="h4" sx={{ mb: 4 }}>Terms & Privacy Management</Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTab-root': { color: '#666' },
            '& .Mui-selected': { color: '#1976d2' }
          }}
        >
          <Tab label="TERMS & CONDITIONS" />
          <Tab label="PRIVACY POLICY" />
        </Tabs>
      </Box>

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
            {editMode ? 'Edit Item' : 'Add New Item'}
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
                  handleUpdate(activeTab === 0 ? 'terms' : 'privacy', currentItem._id);
                } else {
                  handleAdd(activeTab === 0 ? 'terms' : 'privacy');
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
        {(activeTab === 0 ? termsItems : privacyItems).map((item) => (
          <ListItem
            key={item._id}
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
                <IconButton onClick={() => {
                  handleEdit(item);
                  setShowForm(true);
                }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(activeTab === 0 ? 'terms' : 'privacy', item._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {item.titleEn}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.contentEn.substring(0, 100)}...
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TermsPrivacyAdmin;
