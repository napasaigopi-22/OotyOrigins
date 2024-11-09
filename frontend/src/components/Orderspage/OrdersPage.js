import React, { useEffect, useState } from "react";
import NavBar from "../../Assets/NavBar";
import { Box, Typography,  Container, Divider } from "@mui/material";
import Axios from "axios";
import CartProduct from "../../components/CartPage/Cartproducts";
import { useLocation, useNavigate } from "react-router-dom";


function OrdersPage() {
    const [profile, setProfile] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [orderId, setOrderId] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user profile

        Axios.get('http://localhost:4000/user/profile', { params: { userId: localStorage.getItem("userId") } })
            .then(response => {setProfile(response.data); console.log("response is ",response);
                if(response.data[0].IsUser!=0)navigate('/');
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

    return (
        <>
            <NavBar />
            <Container maxWidth="md" >
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h4">Buy Success</Typography>
                    <Typography variant="h6">Order ID: {orderId}</Typography>
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ background: '#f5f5f5', p: 2, borderRadius: 2, mb: 3 }}>
                    <Typography variant="h6">Customer Profile</Typography>
                    <Typography>Name: {profile.name}</Typography>
                    <Typography>Email: {profile.email}</Typography>
                    <Typography>Address: {profile.address}</Typography>
                </Box>

                {orderItems.map((item, i) => (
                    <Box key={i} sx={{ mb: 2 }}>
                        <CartProduct name={item.product.name} price={item.product.price} quantity={item.quantity} />
                    </Box>
                ))}
            </Container>
        </>
    );
}

export default OrdersPage;

