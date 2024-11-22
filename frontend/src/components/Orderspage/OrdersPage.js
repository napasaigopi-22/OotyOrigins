import React, { useEffect, useState } from "react";
import NavBar from "../../Assets/NavBar/NavBar";
import { Box, Typography,  Container, Divider, Card } from "@mui/material";
import Axios from "axios";
import CartProduct from "../../components/CartPage/Cartproducts";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid2'


function OrdersPage() {
    const [profile, setProfile] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [orderId, setOrderId] = useState("");
    const [UserPrdIds, setUserPrdIds] = React.useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user profile

        Axios.post('http://localhost:4000/get/users', { username: localStorage.getItem("username") })
            .then(response => {setProfile(response.data); 
                console.log("profile is ",response.data)
                setUserProductList(response.data[0]);
                // if(response.data[0].IsUser!=0)navigate('/');
            }).catch(error => console.log("Error fetching profile: ", error));

        var prdids=[];
        for(var i=0;i<location.state.products.length;i++)
        {
            prdids.push(location.state.products[i].productId)
        }
        // Fetch order items (cart items)
        Axios.post('http://localhost:4000/post/getProducts', { pid:prdids })
            .then(res => {if(res.data.length>0)setOrderItems(res.data[0].products);})
            .catch(error => console.log("Error fetching cart items: ", error));
        setOrderId(location.state.orderId);
        console.log(location.state)
    }, []);

    const setUserProductList = (userdetails) => {
        Axios.post('http://localhost:4000/post/userOrders', { "userId": localStorage.getItem("userId") }).then(res => {
          const tempvar = res.data.filter(r => r.userId === userdetails.userId);
          console.log("tempwar is ",tempvar.filter(i=>i.orderId==location.state.orderId));
          setUserPrdIds(tempvar.filter(i=>i.orderId==location.state.orderId));
        }).catch(function (error) { console.log(error); });
      };

    return (
        <>
            <NavBar />
            <Container maxWidth="md" >
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h4">Buy Success</Typography>
                    <Typography variant="h6">Order ID: {orderId}</Typography>
                </Box>
                <Divider sx={{ my: 3 }} />

                {orderItems.length>0 && orderItems.map((item, i) => (
                    <Box key={i} sx={{ mb: 2 }}>
                        <CartProduct name={item.product.name} price={item.product.price} quantity={item.quantity} />
                    </Box>
                ))}
                {UserPrdIds.length>0 && UserPrdIds.map((index) => (
                <>
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
              </>
            ))}
            </Container>
        </>
    );
}

export default OrdersPage;

