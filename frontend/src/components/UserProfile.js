import React from "react";
import NavBar from "../Assets/NavBar";
import Axios from 'axios';
import { Box, Container, Paper, Typography, Button, Card } from "@mui/material";
import Grid from '@mui/material/Grid2';
import store from '../Store';
import { useNavigate } from "react-router-dom";
import MyProducts from "./Admin/MyProducts";


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

  React.useEffect(() => {
    Axios.get('http://localhost:4000/get/products').then(res => {
      setproduct(res.data);
      console.log("get products is ", res.data)
      console.log(localStorage.getItem('Token'));
      setAdminProductsList(res.data)
      if (localStorage.getItem('Token') == '') navigate("/")
    }).catch(function (error) {
      console.log(error);
    })
  }, []);

  React.useEffect(() => {
    Axios.post('http://localhost:4000/get/users', { "username": localStorage.getItem("username") }).then(res => {
      setusername(localStorage.getItem("username"));
      setuserload(res.data);
      setUserProductList(res.data);
      store.getState().user = res.data;
      setuser(store.getState().user);

    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  const setUserProductList = (userdetails) => {
    Axios.post('http://localhost:4000/post/userOrders', { "userId": localStorage.getItem("userId") }).then(res => {
      const tempvar = res.data.filter(r => r.userId == userdetails.userId);
      console.log("tempvar is ", tempvar)
      setUserPrdIds(tempvar);
    }).catch(function (error) {
      console.log(error);
    });
  }

  const setAdminProductsList = (products) => {
    if (!userload.IsUser) {
      Axios.post('http://localhost:4000/post/SellerOrders', { "userId": localStorage.getItem("userId") }).then(res => {
        var prdcts = [];
        var deliverProducts = [];
        res.data.forEach(ite => {
          console.log("ite is --", ite.status == "Pending");
          if (ite.status == "Pending")
            prdcts.push(ite);
          else
            deliverProducts.push(ite);
        });
        setdeliveredproducts(deliverProducts);
        setadminpproductsActive(prdcts);
        var filteredprdts = [];
        products.filter((ele) => ele.uploadedBy == localStorage.getItem("userId")).forEach(element => {
          filteredprdts.push(element)
        });
        console.log("filteredprdts is ", filteredprdts);
        setsellerPrdIds(filteredprdts);
        res.data.filter(ite => {
          console.log(ite.products);
          return ite.productId == "p01";
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }

  const SellerOrderClicked = (params) => {
    navigate('/AdminDashboard', { state: params })
  }

  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        {userload.IsUser &&
          <>
            <Grid container maxWidth="xl" spacing={2}>
              <Grid size="grow">
                <p style={{ color: 'black' }}>Recieve Orders</p>
                {/* {JSON.stringify(UserPrdIds)} */}
                {UserPrdIds.map((index, item) => (<Grid>
                  <Card style={{ margin: 'auto', marginBottom: "15px", marginTop: "15px" }}  >
                    <Grid container maxWidth="xl">
                      <Grid size="grow">
                        <Grid container>
                          <Grid size="grow"> <h3>username</h3></Grid>
                          <Grid size="grow"><p>{index.username}</p></Grid>
                        </Grid>
                      </Grid>
                      <Grid size="grow">
                        <Grid container>
                          <Grid size="grow"> <h3>OrderId</h3></Grid>
                          <Grid size="grow"><p>{index.orderId}</p></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* {JSON.stringify(index.products)} */}
                    {index.products.map((item, index) => (
                      <Card sx={3} style={{ width: '75%', margin: 'auto', marginBottom: "15px", marginTop: "15px" }} >
                        <Grid container columns={4}>
                          <Grid size={2}>
                            <p style={{ color: 'black' }}>{item.name}</p>
                          </Grid>
                          <Grid size={2}>
                            <p style={{ color: 'black' }}>{item.price + " X " + item.quantity + " = " + item.quantity * item.price}</p>
                          </Grid>
                        </Grid>
                        <h5>collect {item.name} at {item.uploaderAddress && item.uploaderAddress.street}</h5>
                      </Card>
                    ))}
                    <Grid container columns={4} spacing={4}>
                      <Grid size={2}>
                        {index.paymentMethod}
                      </Grid>
                      <Grid size={2}>
                        {index.totalAmount}
                      </Grid>

                    </Grid>
                  </Card>
                </Grid>))}
                {
                  adminpproductsActive.length == 0 && "No Products"
                }
                <p style={{ color: 'black' }}>Delivered Products</p>
                {deliveredproducts.length != 0 && deliveredproducts.map((index, item) => (
                  <>
                    <div onClick={() => SellerOrderClicked(index)}>
                      <Grid size="grow" >
                        <Card style={{ margin: 'auto', marginBottom: "15px", marginTop: "15px" }}  >
                          {index.username}
                          {index.products.map((item, index) => (
                            <Card sx={3} style={{ width: '75%', margin: 'auto', marginBottom: "15px", marginTop: "15px" }} >
                              <Grid container columns={4}>
                                <Grid size={2}>
                                  <p style={{ color: 'black' }}>{item.name}
                                  </p>
                                </Grid>
                                <Grid size={2}>
                                  <p style={{ color: 'black' }}>{item.price + " X " + item.quantity + " = " + item.quantity * item.price}</p>
                                </Grid>
                              </Grid>
                            </Card>
                          ))}
                          <Grid container columns={4} spacing={4}>
                            <Grid size={2}>
                              {index.paymentMethod}
                            </Grid>
                            <Grid size={2}>
                              {index.totalAmount}
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    </div>
                  </>
                ))}
                {
                  deliveredproducts.length == 0 && "No Products"
                }
              </Grid>
              <Grid size="grow">
                <Paper elevation={3} sx={{ padding: 3, mt: 5 }}>
                  <Typography variant="h4" gutterBottom>
                    User Profile
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
                    {['Street', 'City', 'State', 'Zipcode'].map((label, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper className="address-field">
                          <Typography variant="body2" gutterBottom>{label}</Typography>
                          <Typography>{user ? user.address[label.toLowerCase()] : ""}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>


                </Paper>
              </Grid>
            </Grid>
          </>
        }
        {!userload.IsUser && <>
          <Grid container maxWidth="xl" spacing={2}>
            <Grid size="grow">
              <p style={{ color: 'black' }}>Pending Orders</p>
              {adminpproductsActive.length != 0 && adminpproductsActive.map((index, item) => (
                <>
                  <div onClick={() => SellerOrderClicked(index)}>
                    <Grid>
                      <Card style={{ margin: 'auto', marginBottom: "15px", marginTop: "15px" }}  >
                        {index.username}
                        {index.products.map((item, index) => (
                          <Card sx={3} style={{ width: '75%', margin: 'auto', marginBottom: "15px", marginTop: "15px" }} >
                            <Grid container columns={4}>
                              <Grid size={2}>
                                <p style={{ color: 'black' }}>{item.name}</p>
                              </Grid>
                              <Grid size={2}>
                                <p style={{ color: 'black' }}>{item.price + " X " + item.quantity + " = " + item.quantity * item.price}</p>
                              </Grid>
                            </Grid>
                          </Card>
                        ))}
                        <Grid container columns={4} spacing={4}>
                          <Grid size={2}>
                            {index.paymentMethod}
                          </Grid>
                          <Grid size={2}>
                            {index.totalAmount}
                          </Grid>

                        </Grid>
                      </Card>
                    </Grid>
                  </div>
                </>
              ))}
              {
                adminpproductsActive.length == 0 && "No Products"
              }
              <p style={{ color: 'black' }}>Delivered Products</p>
              {deliveredproducts.length != 0 && deliveredproducts.map((index, item) => (
                <>
                  <div onClick={() => SellerOrderClicked(index)}>
                    <Grid size="grow" >
                      <Card style={{ margin: 'auto', marginBottom: "15px", marginTop: "15px" }}  >
                        {index.username}
                        {index.products.map((item, index) => (
                          <Card sx={3} style={{ width: '75%', margin: 'auto', marginBottom: "15px", marginTop: "15px" }} >
                            <Grid container columns={4}>
                              <Grid size={2}>
                                <p style={{ color: 'black' }}>{item.name}
                                </p>
                              </Grid>
                              <Grid size={2}>
                                <p style={{ color: 'black' }}>{item.price + " X " + item.quantity + " = " + item.quantity * item.price}</p>
                              </Grid>
                            </Grid>
                          </Card>
                        ))}
                        <Grid container columns={4} spacing={4}>
                          <Grid size={2}>
                            {index.paymentMethod}
                          </Grid>
                          <Grid size={2}>
                            {index.totalAmount}
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  </div>
                </>
              ))}
              {
                deliveredproducts.length == 0 && "No Products"
              }
            </Grid>
            <Grid size={6}>
              <Box>Welcome, {userload.username}</Box>
              <Typography>Your Products</Typography>
              <Paper>
                <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 2, sm: 4, md: 5 }}>
                  {product.filter((ele) => ele.uploadedBy == localStorage.getItem("userId")).map((index, item) => (
                    <>
                      <Grid size={{ xs: 1, sm: 2, md: 2 }}>
                        <MyProducts name={index.name} src={index.images[0]} stock={index.stock} />
                      </Grid>
                    </>
                  ))}
                </Grid>
                <Box>
                  <Button variant="contained" onClick={() => navigate('/Addproduct')}>Add product</Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>



        </>}
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