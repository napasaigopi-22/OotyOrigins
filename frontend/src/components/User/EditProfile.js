import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [changedpassword, setchangedpassword] = useState('');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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

  const handlePassInput = (e) =>{console.log(changedpassword); setchangedpassword(e.target.value);}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`http://localhost:4000/post/UpdateUser`, userDetails);
      console.log('Profile updated:', response.data);
      setSnackMessage("Profile updated successfully!");
      console.log("setting userDetails.username ", userDetails.username)
      localStorage.setItem("username", userDetails.username)
      setOpenSnack(true);
      navigate('/UserProfile');
    } catch (error) {
      console.error('Error saving profile details:', error);
      setSnackMessage("Failed to update profile. Please try again.");
      setOpenSnack(true);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await Axios.delete(`http://localhost:4000/delete/id`, {
        data: { _id: userDetails._id }
      });
      console.log('Account deleted:', response.data);
      setSnackMessage('Account deleted successfully!');
      setOpenSnack(true);
      localStorage.removeItem("username");
      setOpenDialog(false);
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      setSnackMessage('Failed to delete account. Please try again.');
      setOpenSnack(true);
      setOpenDialog(false);
    }
  };

  const formStyles = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const headerStyles = {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  };

  const buttonStyles = {
    backgroundColor: 'red',
    color: 'white',
    '&:hover': { backgroundColor: 'darkred' },
    marginTop: '20px',
    width: '100%',
    padding: '12px 0',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const handlePassChange = () =>{
    axios.post('http://localhost:4000/post/ChangePassword', { 'password':changedpassword, 'userId':localStorage.getItem('userId') })
        .then(res => {    console.log(res)    })
        .catch(error => console.log(error));
  }
  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h2 style={headerStyles}>Edit Profile</h2>
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
        variant="contained"
        sx={{ backgroundColor: 'lightgreen', color: 'brown', '&:hover': { backgroundColor: 'light' }, mr: 10 }}
        onClick={handleClickOpen('paper')}        >
        Change Password
      </Button>
      <Button
        type="submit"
        variant="contained"
        sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
      >
        Save Changes
      </Button>

      <Button onClick={() => navigate('/UserProfile')}
        sx={{ marginTop: '10px', width: '100%' }}>Back</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Change Password</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          ><TextField  id="outlined-basic" label="New Password" onChange={handlePassInput}          type="password"
           variant="outlined" />
          <br/>

          <TextField sx={{mt:3}} id="outlined-basic" label="Re Enter"           type="password"
 variant="outlined" />

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined"         sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
 onClick={handleClose}>Cancel</Button>
          <Button variant="outlined"         sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
 onClick={handlePassChange}>Change</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default EditProfile;