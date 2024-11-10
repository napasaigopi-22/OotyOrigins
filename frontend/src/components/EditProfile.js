import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Grid } from '@mui/material';
import axios from 'axios';

const EditProfile = ({ userId, isAdmin }) => {
  // Define state variables for profile data
  const [profileData, setProfileData] = useState({
    name: '',
    phoneNumber: '',
    address: ''
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user's current profile data on component mount
    axios.get(`http://localhost:4000/api/users/${userId}`).then((response) => {
      setProfileData({
        name: response.data.name,
        phoneNumber: response.data.phoneNumber,
        address: response.data.address
      });
      setLoading(false);
    });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the user's profile in the backend
    axios.put(`http://localhost:4000/api/users/${userId}`, profileData)
      .then((response) => {
        alert('Profile updated successfully!');
      })
      .catch((error) => {
        alert('There was an error updating the profile.');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={profileData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditProfile;
