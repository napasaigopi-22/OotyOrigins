import React, { useEffect, useState } from "react";
import NavBar from "../../Assets/NavBar";
import { Box, Typography, Button, Container, Divider } from "@mui/material";
import Axios from "axios";
import CartProduct from "../../components/CartPage/Cartproducts";


function OrdersPage() {
    const [profile, setProfile] = useState({});
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        // Fetch user profile
        Axios.get('http://localhost:4000/user/profile', { params: { userId: localStorage.getItem("userId") } })
            .then(response => setProfile(response.data))
            .catch(error => console.log("Error fetching profile: ", error));

        // Fetch order items (cart items)
        Axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") })
            .then(res => setOrderItems(res.data[0].products))
            .catch(error => console.log("Error fetching cart items: ", error));
    }, []);

    return (
        <>
            <NavBar />
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h4">Buy Success</Typography>
                    <Typography variant="h6">Order ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</Typography>
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

