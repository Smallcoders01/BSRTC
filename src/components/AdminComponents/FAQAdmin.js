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
  IconButton,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import config from '../../config';

const FAQAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [currentFAQ, setCurrentFAQ] = useState({
    questionEn: '',
    answerEn: '',
    questionHi: '',
    answerHi: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${config.apiBaseUrl}/faq`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFaqs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching FAQs: ' + err.message);
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      if (editMode) {
        const response = await axios.put(`${config.apiBaseUrl}/faq/${currentFAQ._id}`, currentFAQ, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFaqs(faqs.map(faq => (faq._id === currentFAQ._id ? response.data : faq)));
      } else {
        const response = await axios.post(`${config.apiBaseUrl}/faq`, currentFAQ, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFaqs([...faqs, response.data]);
      }
      resetForm();
      alert(`${editMode ? 'FAQ updated' : 'FAQ added'} successfully`);
    } catch (err) {
      setError('Error saving FAQ: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${config.apiBaseUrl}/faq/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFaqs(faqs.filter(faq => faq._id !== id));
      alert('FAQ deleted successfully');
    } catch (err) {
      setError('Error deleting FAQ: ' + err.message);
    }
  };

  const handleEdit = (faq) => {
    setCurrentFAQ(faq);
    setEditMode(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setCurrentFAQ({
      questionEn: '',
      answerEn: '',
      questionHi: '',
      answerHi: ''
    });
    setEditMode(false);
    setShowForm(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4 }}>FAQ Management</Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setShowForm(true)}
        sx={{ mb: 3 }}
      >
        ADD NEW FAQ
      </Button>

      {showForm && (
        <Box sx={{ mb: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
          <Typography variant="h6" sx={{ mb: 3 }}>{editMode ? 'Edit FAQ' : 'Add New FAQ'}</Typography>
          
          <TextField
            label="Question (English)"
            variant="outlined"
            fullWidth
            value={currentFAQ.questionEn}
            onChange={(e) => setCurrentFAQ({ ...currentFAQ, questionEn: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Answer (English)"
            variant="outlined"
            fullWidth
            value={currentFAQ.answerEn}
            onChange={(e) => setCurrentFAQ({ ...currentFAQ, answerEn: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Question (Hindi)"
            variant="outlined"
            fullWidth
            value={currentFAQ.questionHi}
            onChange={(e) => setCurrentFAQ({ ...currentFAQ, questionHi: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Answer (Hindi)"
            variant="outlined"
            fullWidth
            value={currentFAQ.answerHi}
            onChange={(e) => setCurrentFAQ({ ...currentFAQ, answerHi: e.target.value })}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleAddOrUpdate}>
              {editMode ? 'Update FAQ' : 'Save FAQ'}
            </Button>
            <Button variant="outlined" onClick={resetForm}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      <List sx={{ bgcolor: 'background.paper' }}>
        {faqs.map((faq) => (
          <ListItem
            key={faq._id}
            sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}
            secondaryAction={
              <Box>
                <IconButton onClick={() => handleEdit(faq)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(faq._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {faq.questionEn} (English)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {faq.answerEn}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {faq.questionHi} (Hindi)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {faq.answerHi}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default FAQAdmin;