import React from "react";
import NavBar from "../Assets/NavBar";
import Axios from 'axios';
import { Box, Container, Grid2, Paper, Typography } from "@mui/material";

function Userprofile()
{
    const [username,setusername] = React.useState("");
    const [user,setuser] = React.useState(null);
    const [userload,setuserload] = React.useState(false);
   
    React.useEffect(()=>{
        setusername(localStorage.getItem("username"));
        console.log("setting usernmae")
    });
    
    React.useEffect(()=>{
        Axios.post('http://localhost:4000/get/users',{"username":username}).then(res => {
            // setcategories(res.data);
            console.log("userdata ======== ", res.data);
            setuser(res.data);
            setuserload(true);
        }).catch(function (error) {
            console.log(error);
        })
    },[username]);

    

    return (
        <>
          <NavBar />
          <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, mt: 5 }}>
              <Typography variant="h4" gutterBottom>
                User Profile Page
              </Typography>
              <Typography variant="h5" gutterBottom>
                Welcome Back, {username}
              </Typography>
    
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">Phone: {user ? user.phone : " "}</Typography>
              </Box>
    
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Address
              </Typography>
              
              <Grid2 container spacing={2}>
                <Grid2 item xs={6}>
                  <Typography variant="body2" gutterBottom>Street</Typography>
                  <Typography>{user ? user.address["street"] : ""}</Typography>
                </Grid2>
    
                <Grid2 item xs={6}>
                  <Typography variant="body2" gutterBottom>City</Typography>
                  <Typography>{user ? user.address["city"] : ""}</Typography>
                </Grid2>
    
                <Grid2 item xs={6}>
                  <Typography variant="body2" gutterBottom>State</Typography>
                  <Typography>{user ? user.address["state"] : ""}</Typography>
                </Grid2>
    
                <Grid2 item xs={6}>
                  <Typography variant="body2" gutterBottom>Zipcode</Typography>
                  <Typography>{user ? user.address["zipcode"] : ""}</Typography>
                </Grid2>
              </Grid2>
            </Paper>
          </Container>
        </>
      );
}

export default Userprofile;