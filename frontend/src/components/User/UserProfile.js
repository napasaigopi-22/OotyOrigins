import React, { useEffect } from "react";
import NavBar from "../../Assets/NavBar/NavBar";
import Axios from 'axios';
import { Box, Container, Paper, Typography, Button, Card } from "@mui/material";
import Grid from '@mui/material/Grid2';
import store from '../../Store';
import { useNavigate } from "react-router-dom";
import MyProducts from "../Admin/MyProducts";
import EditProfile from "./EditProfile";

function Userprofile() {
  const [username, setusername] = React.useState("");
  const [user, setuser] = React.useState(null);
  const [product, setproduct] = React.useState([]);
  const [userload, setuserload] = React.useState("");
  const [adminpproductsActive, setadminpproductsActive] = React.useState([]);
  const [sellerPrdIds, setsellerPrdIds] = React.useState([]);
  const [deliveredproducts, setdeliveredproducts] = React.useState([]);
  const [UserPrdIds, setUserPrdIds] = React.useState([]);
  const navigate = useNavigate();

  // setusername(localStorage.getItem("username"));
  const handleEditClick = () => {
    // Navigate to EditProfile page with user data
    navigate('/editprofile');
  };

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (!token) navigate("/edit-profile/:userId");
  }, []);

  React.useEffect(() => {
    Axios.get('http://localhost:4000/get/products').then(res => {
      setproduct(res.data);
      console.log("get products is ", res.data);
      console.log(localStorage.getItem('Token'));
      setAdminProductsList(res.data);
      if (localStorage.getItem('Token') === '') navigate("/");
    }).catch(function (error) { console.log(error); });
  }, []);

  React.useEffect(() => {
    Axios.post('http://localhost:4000/get/users', { "username": localStorage.getItem("username") }).then(res => {
      setusername(localStorage.getItem("username"));
      setuserload(res.data[0]);
      setUserProductList(res.data[0]);
      store.getState().user = res.data;
      setuser(res.data[0]);
    }).catch(function (error) { console.log(error); });
  }, []);

  const setUserProductList = (userdetails) => {
    Axios.post('http://localhost:4000/post/userOrders', { "userId": localStorage.getItem("userId") }).then(res => {
      const tempvar = res.data.filter(r => r.userId === userdetails.userId);
      setUserPrdIds(tempvar.reverse());
    }).catch(function (error) { console.log(error); });
  };

  const setAdminProductsList = (products) => {
    if (!userload.IsUser) {
      Axios.post('http://localhost:4000/post/SellerOrders', { "userId": localStorage.getItem("userId") }).then(res => {
        var prdcts = [];
        var deliverProducts = [];

        res.data.forEach(ite => {
          if (ite.status === "Pending") prdcts.push(ite);
          else deliverProducts.push(ite);
        });

        setdeliveredproducts(deliverProducts);
        setadminpproductsActive(prdcts);

        var filteredprdts = [];
        products.filter((ele) => ele.uploadedBy === localStorage.getItem("userId")).forEach(element => {
          filteredprdts.push(element);
        });

        setsellerPrdIds(filteredprdts);

        res.data.filter(ite => { return ite.productId === "p01"; });
      }).catch(error => { console.log(error) });
    }
  };

  const SellerOrderClicked = (params) => {
    navigate('/AdminDashboard', { state: params });
  };

  return (<>
    <NavBar />
    <Container maxWidth="xl">
      {userload.IsUser && <>
        <Grid container maxWidth="xl" spacing={2}>
          <Grid size="grow">
            <p style={{ color: 'black' }}>Receive Orders</p>
            {/* JSON.stringify(UserPrdIds) */}
            {UserPrdIds.filter(i => i.status !== "Delivered").map((index) => (
              <Grid key={index.orderId}> {/* Added key prop for list items */}
                <Card style={{ margin: 'auto', marginBottom: "15px", marginTop: "15px" }}>
                  <Grid container maxWidth="xl">
                    <Grid size="grow">
                      <Grid container>
                        <Grid size="grow"> <h3>Username</h3> </Grid>
                        <Grid size="grow"><p>{index.username}</p></Grid>
                      </Grid>
                    </Grid>
                    <Grid size="grow">
                      <Grid container>
                        <Grid size="grow"> <h3>Order ID</h3></Grid>
                        <Grid size="grow"><p>{index.orderId}</p></Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {index.products.map((item) => (
                    <Card sx={3} style={{ width: '75%', margin: 'auto', marginBottom: "15px", marginTop: "15px" }}>
                      <Grid container columns={4}>
                        <Grid size={2}> <p style={{ color: 'black' }}>{item.name}</p> </Grid>
                        <Grid size={2}> <p style={{ color: 'black' }}>{item.price + " X " + item.quantity + " = " + item.quantity * item.price}</p> </Grid>
                      </Grid>
                      <h5>Collect {item.name} at {item.uploaderAddress && item.uploaderAddress.street}</h5>
                    </Card>
                  ))}

                  <Grid container columns={4} spacing={4}>
                    <Grid size={2}> {index.paymentMethod} </Grid>
                    <Grid size={2}> {index.totalAmount} </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
            {UserPrdIds.filter(i => i.status !== "Delivered").length === 0 && "No Products"}
            <p style={{ color: 'black' }}>Delivered Products</p>
            {UserPrdIds.filter(i => i.status === "Delivered").length !== 0 && UserPrdIds.filter(i => i.status === "Delivered").map((index) => (<>
              <div>
                <Grid size="grow">
                  <Card style={{ margin: 'auto', marginBottom: "15px", marginTop: "15px" }}>
                    {index.username}
                    {index.products.map((item) => (
                      <Card sx={3} style={{ width: '75%', margin: 'auto', marginBottom: "15px", marginTop: "15px" }}>
                        <Grid container columns={4}>
                          <Grid size={2}> <p style={{ color: 'black' }}>{item.name}</p></ Grid>
                          <Grid size={2}> <p style={{ color: 'black' }}>{item.price + " X " + item.quantity + " = " + item.quantity * item.price}</p></ Grid>
                        </ Grid >
                      </ Card >
                    ))}

                    < Grid container columns={4} spacing={4} >
                      < Grid size={2} > {index.paymentMethod} </ Grid >
                      < Grid size={2} > {index.totalAmount} </ Grid >
                    </Grid >
                  </Card >
                </Grid >
              </ div >
            </>
            ))}

            {UserPrdIds.filter(i => i.status === "Delivered").length === 0 && "No Products"}

          </ Grid>

          {/* User Profile Section */}
          < Grid size="grow">
            < Paper elevation={3} sx={{ padding: 3, mt: 5 }}>
              <Typography variant="h4" gutterBottom>User Profile</Typography>
              <Typography variant="h5" gutterBottom>Welcome Back, {username}</Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body1">Phone: {user ? user.phone : " "}</Typography>
              </Box>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Address</Typography>

              {/* Address Fields */}
              < Grid container spacing={2}>
                {['Street', 'City', 'State', 'Zipcode'].map((label, index) => (
                  < Grid item xs={12} sm={6} key={index}>
                    < Paper className="address-field">
                      < Typography variant="body2" gutterBottom>{label}</Typography>
                      < Typography>{user ? user.address[label.toLowerCase()] : ""}</Typography>
                    </ Paper >
                  </ Grid >
                ))}
              </ Grid >

              {/* Edit Profile Button */}
              < Button variant="contained" sx={{ backgroundColor: 'yellow', color: 'black', '&:hover': { backgroundColor: 'darkred' } }} onClick={handleEditClick}>
                Edit Profile
              </ Button >
            </ Paper >
          </ Grid>
        </ Grid>
      </>
      }

      {!userload.IsUser && <>
        {/* Pending Orders Section */}
        < Grid container maxWidth="xl" spacing={2}>
          {/* Pending Orders Header */}
          < Grid size="grow">
            < p style={{ color: 'black' }}>Pending Orders</p>

            {/* Pending Orders List */}
            {adminpproductsActive.length !== 0 && adminpproductsActive.map((index) => (<>
              {/* Order Card */}
              < div onClick={() => SellerOrderClicked(index)}>
                < Grid >
                  < Card style={{ margin: 'auto', marginBottom: "15px", marginTop: "15px" }}>
                    {index.username}

                    {/* Product Details */}
                    {index.products.map((item) => (
                      <>
                        {/* Product Card */}
                        < Card sx={3} style={{ width: '75%', margin: 'auto', marginBottom: "15px", marginTop: "15px" }}>
                          {/* Product Info */}
                          < Grid container columns={4}>
                            {/* Product Name and Price */}
                            < Grid size={2}>
                              < p style={{ color: 'black' }}>{item.name}</p>
                            </ Grid >
                            {/* Product Price */}
                            < Grid size={2}>
                              < p style={{ color: 'black' }}>{item.price + " X " + item.quantity + " = " + item.quantity * item.price}</p>
                            </ Grid >
                          </ Grid >
                        </ Card >
                      </>
                    ))}

                    {/* Payment Method and Total Amount */}
                    < Grid container columns={4} spacing={4}>
                      {/* Payment Method */}
                      < Grid size={2}>
                        {index.paymentMethod}
                      </ Grid >
                      {/* Total Amount */}
                      < Grid size={2}>
                        {index.totalAmount}
                      </ Grid >
                    </ Grid >
                  </ Card >
                </ Grid >
              </ div >
            </>
            ))}

            {/* No Pending Products Message */}
            {adminpproductsActive.length === 0 && ("No Products")}

            {/* Delivered Products Header */}
            < p style={{ color: 'black' }}>Delivered Products</ p >

            {/* Delivered Products List */}
            {
              deliveredproducts.length !== 0 && deliveredproducts.map((index) => (<>
                {/* Order Card for Delivered Products */}
                {
                  /* Clickable Div */
                  (<div onClick={() => SellerOrderClicked(index)}>
                    {/* Card for Each Order */}
                    {
                      /* Card for Each Order */
                      (<Card style={{
                        margin: 'auto',
                        marginBottom: "15px",
                        marginTop: "15px"
                      }}>
                        {
                          /* Username */
                          (<>{index.username}
                            {
                              /* Product Details */
                              index.products.map((item) => (
                                <>
                                  {
                                    /* Product Card */
                                    (<Card sx={3} style={{
                                      width: '75%',
                                      margin: 'auto',
                                      marginBottom: "15px",
                                      marginTop: "15px"
                                    }}>
                                      {
                                        /* Product Info */
                                        (< Grid container columns={4} >
                                          {
                                            /* Product Name */
                                            (< Grid size={2} >< p style={{ color: 'black' }}>{item.name}</ p ></ Grid >)
                                          }
                                          {
                                            /* Product Price */
                                            (< Grid size={2} >< p style={{ color: 'black' }}>{item.price + " X " + item.quantity + " = " + item.quantity * item.price}</ p ></ Grid >)
                                          }
                                        </Grid>
                                        )}
                                    </Card>
                                    )}
                                </>
                              ))
                            }
                          </>
                          )}
                        {
                          /* Payment Method and Total Amount */
                          (< Grid container columns={4} spacing={4} >
                            {
                              /* Payment Method */
                              (< Grid size={2} >{index.paymentMethod}</ Grid >)
                            }
                            {
                              /* Total Amount */
                              (< Grid size={2} >{index.totalAmount}</ Grid >)
                            }
                          </Grid>
                          )}
                      </Card>
                      )}
                  </div>
                  )}
              </>
              ))}

            {
              /* No Delivered Products Message */
              deliveredproducts.length === 0 && ("No Products")
            }
          </Grid>
          <Grid size="grow">
            <Box>Welcome, {userload.username}</Box>
            <Typography>Your Products</Typography>
            <Paper>
              <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 2, sm: 4, md: 5 }}>
                {
                  /* Filtering User's Uploaded Products */
                  product
                    .filter((ele) => ele.uploadedBy === localStorage.getItem("userId"))
                    .map((index) => (
                      <Grid size={{ xs: 1, sm: 2, md: 2 }} key={index.name}>
                        <div onClick={()=>{
                          console.log("clicked",index);
                          index.prdId=index.productId;
                          navigate('/productDetail',{state:index})
                        }}>
                        <MyProducts  name={index.name} src={index.images[0]} stock={index.stock} />
                        </div>
                      </Grid>
                    ))
                }
              </Grid>

              <Box>
                <Button variant="contained" onClick={() => navigate('/Addproduct')}>
                  Add product
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </>
      }

    </Container>


  </>
  ); // End of return statement
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