import { useState, useEffect } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const [userDetails, setUserDetails] = useState({
    username: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
    },
  });
  const [snackMessage, setSnackMessage] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await Axios.post('http://localhost:4000/get/users/', { username: localStorage.getItem('username') });
        console.log('Fetched user details:', response.data);
        setUserDetails(response.data[0]);

      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update nested address fields
    if (['street', 'city', 'state', 'zipcode'].includes(name)) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        address: {
          ...prevDetails.address,
          [name]: value,
        },
      }));
    } else {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("userDetails is ==================================",userDetails)
      const response = await Axios.post(`http://localhost:4000/post/UpdateUser`, userDetails);
      console.log('Profile updated:', response.data);
      setSnackMessage("Profile updated successfully!");
      console.log("setting userDetails.username ",userDetails.username)
      localStorage.setItem("username",userDetails.username)
      setOpenSnack(true);
      // navigate('/UserProfile');
    } catch (error) {
      console.error('Error saving profile details:', error);
      setSnackMessage("Failed to update profile. Please try again.");
      setOpenSnack(true);
    }
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
    if(snackMessage=="Profile updated successfully!")
      navigate('/UserProfile');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <TextField
        label="Username"
        name="username"
        value={userDetails.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField 
        label="Phone"
        name="phone"
        value={userDetails.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      
      <TextField 
        label="Street"
        name="street"
        value={userDetails.address.street}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField 
        label="City"
        name="city"
        value={userDetails.address.city}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField 
        label="State"
        name="state"
        value={userDetails.address.state}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField 
        label="Zipcode"
        name="zipcode"
        value={userDetails.address.zipcode}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Button 
        type="submit"
        variant="contained"
        sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
      >
        Save Changes
      </Button>

      <Button onClick={()=>navigate('/UserProfile')} >Back</Button>

      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        message={snackMessage}
      />
    </form>
  );
}

export default EditProfile;
