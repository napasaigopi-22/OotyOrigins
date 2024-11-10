import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import  Axios  from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const [userDetails, setUserDetails] = useState({
    username: '',
    Phone: '',
    Address: '',
    handleChange: '',

  });

  const navigate = useNavigate();

  // Fetch user details from the backend when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await Axios.post('http://localhost:4000/get/users/',{"username":localStorage.getItem('username')}); 
        console.log('Fetched user details:', response.data);
        setUserDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);


  const handleChange = (e) => {
    const { username, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [username]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call backend API to save updated details
      const response = await Axios.put('http://localhost:4000/api/user/:id', userDetails); // Replace with actual API endpoint
      console.log('Profile updated:', response.data);
      navigate('/profile'); // Redirect to the Profile page after saving changes
    } catch (error) {
      console.error('Error saving profile details:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <TextField
        label="username"
        name="username"
        value={userDetails.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField 
        label="Phone"
        name="Phone"
        value={userDetails.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
       <TextField
        label="Address"
        name="Address"
        value={userDetails.Address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* Add other form fields for additional details */}
      
      <Button variant="contained"
      sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
      //onClick={handleEditClick}
      >
        Save Changes
      </Button>
    </form>
  );
}

export default EditProfile;
