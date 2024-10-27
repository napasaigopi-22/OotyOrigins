import Axios from "axios";
import NavBar from "../../Assets/NavBar";
import React from "react";
import { Box, Button, Card, Container, Divider, Typography, Grid } from "@mui/material";
import CartProduct from "./Cartproducts";
import { useNavigate } from "react-router-dom";

function CartPage() {
    const [products, setProducts] = React.useState([]);
    const [totalAmount, setTotalAmount] = React.useState(0);
    const navigate = useNavigate();
    React.useEffect(() => {
        Axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") }).then(res => {
            console.log("in cart page ", res.data[0].products);
            setProducts(res.data[0].products);
            setTotalAmount(res.data[0].totalAmount);
        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    const confirmBuy = (userId) => {
        console.log(userId);
        navigate('/Orders')
    }
    return (
        <>
            <NavBar />
            <div>
                <Container maxWidth="md">


                    <Card maxWidth="md">
                        <h2>Shopping Cart</h2>
                        {products.map((ele, i) => {
                            return (
                                <Box key={i} sx={{ textAlign: 'center', margin: 'auto' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 0', justifyContent: 'center' }}>
                                        <CartProduct name={ele.product.name} price={ele.product.price} quantity={ele.quantity} />
                                    </div>
                                    <Divider sx={{ my: 2 }} variant="middle" />
                                </Box>)

                        })}
                      <Divider sx={{ my: 2 }} />
                      <Grid container spacing={2}>
                        <Typography variant="h6" align="left">
                        <Button variant="contained"  onClick={() => { confirmBuy(localStorage.getItem('userId')) }} >Confirm buy</Button>
                        </Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography variant="h6" align="right">
                            Total: ₹ {totalAmount} 
                        </Typography>
                        </Grid>
                    </Card>
                </Container>
            </div>
        </>
    )
}


export default CartPage;