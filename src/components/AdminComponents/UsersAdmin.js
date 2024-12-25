import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Alert, Button } from 'react-bootstrap';
import config from '../../config';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch the users from the API
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Debugging line
    axios.get(`${config.apiBaseUrl}/auth/users`, {
      headers: {
        Authorization: `Bearer ${token}` // Ensure the token is sent with the request
      }
    })
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching users');
        setLoading(false);
      });
  }, []);

  const handleRoleChange = (userId, newRole) => {
    const token = localStorage.getItem('token');
    axios.put(`${config.apiBaseUrl}/auth/user/${userId}`, { role: newRole }, {
      headers: {
        Authorization: `Bearer ${token}` // Ensure the token is sent with the request
      }
    })
      .then(response => {
        setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
        setSuccess('Role updated successfully');
        setError('');
      })
      .catch(error => {
        setError('Error updating role');
        setSuccess('');
      });
  };

  const handleDeleteUser = (userId) => {
    const token = localStorage.getItem('token');
    axios.delete(`${config.apiBaseUrl}/auth/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Ensure the token is sent with the request
      }
    })
      .then(response => {
        setUsers(users.filter(user => user._id !== userId));
        setSuccess('User deleted successfully');
        setError('');
      })
      .catch(error => {
        setError('Error deleting user');
        setSuccess('');
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (success) return <Alert variant="success">{success}</Alert>;

  return (
    <div>
      <h1>Users Admin</h1>
      <p>Manage users here.</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Verified Status</th> {/* New column for verification status */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <Form.Select 
                  value={user.role} 
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </td>
              <td>
                {/* Display verification status */}
                {user.isVerified ? (
                  <span style={{ color: 'green' }}>Verified</span>
                ) : (
                  <span style={{ color: 'red' }}>Not Verified</span>
                )}
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersAdmin;