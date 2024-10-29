import React from "react";
import NavBar from "../Assets/NavBar";
import Axios from 'axios';
import { Box, Container, Paper, Typography, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import store from '../Store';
import { useNavigate } from "react-router-dom";
import MyProducts from "./Admin/MyProducts";

function Userprofile() {
  const [username, setusername] = React.useState("");
  const [user, setuser] = React.useState(null);
  const [product, setproduct] = React.useState([]);
  const [userload, setuserload] = React.useState("");
  const [adminpproducts, setadminpproducts] = React.useState([]);
  const navigate = useNavigate();
  // setusername(localStorage.getItem("username"));

  React.useEffect(() => {
    Axios.get('http://localhost:4000/get/products').then(res => {
      setproduct(res.data);
      console.log("get products is ", res.data)
      console.log(localStorage.getItem('Token'))
        if(localStorage.getItem('Token')=='')navigate("/")
    }).catch(function (error) {
      console.log(error);
    })
  }, []);

  React.useEffect(() => {
    Axios.post('http://localhost:4000/get/users', { "username": localStorage.getItem("username") }).then(res => {
      // setcategories(res.data);
      console.log("userdata ======== ", res.data, " ~~~~ ", localStorage.getItem("username"));
      setusername(localStorage.getItem("username"));
      setuserload(res.data)
      store.getState().user = res.data;
      setuser(store.getState().user);
      if (res.data.IsUser)
        Axios.post('http://localhost:4000/get/SellerProducts', { "username": localStorage.getItem("username") }).then(res => {
          console.log("res for seller items = ", res);

        }).catch(error => {
          console.log("error is ", error)
        })
    }).catch(function (error) {
      console.log(error);
    });
  }, [])

  return (
    <>
      <NavBar />
      <Container maxWidth="md">
        {userload.IsUser &&
          <>
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

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ padding: 2 }}>
                    <Typography variant="body2" gutterBottom>Street</Typography>
                    <Typography>{user ? user.address.street : ""}</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <paper sx={{ padding: 2 }}>
                    <Typography variant="body2" gutterBottom>City</Typography>
                    <Typography>{user ? user.address["city"] : ""}</Typography>
                  </paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <paper sx={{ padding: 2 }}>
                    <Typography variant="body2" gutterBottom>State</Typography>
                    <Typography>{user ? user.address["state"] : ""}</Typography>
                  </paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <paper sx={{ padding: 2 }}>
                    <Typography variant="body2" gutterBottom>Zipcode</Typography>
                    <Typography>{user ? user.address["zipcode"] : ""}</Typography>
                  </paper>
                </Grid>
              </Grid>
            </Paper>
          </>
        }
        {userload.IsUser && "lala"}
        {!userload.IsUser && <><Paper>
          <Box>Welcome, {userload.username}</Box>
          <Typography>Your Products</Typography>
          <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 15 }}>
            {product.filter((ele) => ele.uploadedBy == localStorage.getItem("userId")).map((index, item) => (
              <>
                <Grid size={{ xs: 2, sm: 4, md: 5 }}>
                  <MyProducts name={index.name} src={index.images[0]} stock={index.stock} />
                </Grid>
              </>
            ))}
          </Grid>
          <Box>
            <Button variant="contained" onClick={() => navigate('/Addproduct')}>Add product</Button>
          </Box>
        </Paper></>}
        {!userload.IsUser && <>
        </>
        }
      </Container>
    </>
  );
}


const styles = {
  inputBox: {
    padding: 2,
    borderRadius: 2,
    border: "1px solid #e0e0e0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fafafa",
  },
  sectionTitle: {
    marginTop: 2,
    marginBottom: 1,
    color: "#555",
  },
};

export default Userprofile;