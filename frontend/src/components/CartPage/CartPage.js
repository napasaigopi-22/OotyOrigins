import Axios from "axios";
import NavBar from "../../Assets/NavBar";
import React from "react";
import { Box, Container, Divider, Typography, Grid, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl } from "@mui/material";
import { Card, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import CartProduct from "./Cartproducts";
import { useNavigate } from "react-router-dom";

function CartPage() {
    const [products, setProducts] = React.useState([]);
    const [totalAmount, setTotalAmount] = React.useState(0);
    const [cart, setCart] = React.useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        Axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") }).then(res => {
            console.log("in cart page ", res.data[0].products);
            setCart(res.data[0]);
            setProducts(res.data[0].products);
            setTotalAmount(res.data[0].totalAmount);
        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    const confirmBuy = (userId) => {
        console.log(handleClickOpen());
        console.log(userId);
        console.log(cart);
        Axios.post('http://localhost:4000/post/CreateOrder', cart).then(res => {
            console.log("response is =", res.data);
            navigate('/Orders', { state: res.data });
        }).catch(error=>{
            console.log(error)
        });
        //cart is active to be 0
        //cart should go to order
        //make order active
        //send notification to each and every corresponding product seller notification about the order
        //give option for the user to click on delivered for that specific user, in admin dashboard

    }
    return (
        <>
            <NavBar />
            <div>
                <Container maxWidth="md">


                    <Card maxWidth="md">
                        <h2>Shopping Cart</h2>
                        <Divider sx={{ my: 1 }}/>
                        {products.map((ele, i) => {
                            return (
                                <Box key={i} sx={{ textAlign: 'center', margin: 'auto' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 0', justifyContent: 'center' }}>
                                        <CartProduct name={ele.product.name} price={ele.product.price} quantity={ele.quantity} />
                                    </div>
                                    <Divider sx={{ my: 2 }} variant="middle" />
                                </Box>)
                        })}

                         <Divider sx={{ my: 2 }}/>
                      <Grid container spacing={2} alignItems="left">
                        <Grid item xs={4} md={6}>
                        <Button variant="contained" sx={{ backgroundColor: 'red' ,fontWeight: 'bold',  padding: '10px 20px',}} onClick={() => { confirmBuy(localStorage.getItem('userId')) }} >Confirm buy</Button>
                        </Grid>
                        <Grid item xs={6} >
                        <Typography variant="h6" sx={{fontWeight: 'bold'}} >
                            Total: ₹ {totalAmount} 
                        </Typography>   
                        </Grid>
                        </Grid>
                        <Divider sx={{ my: 1 }}/>
                    </Card>
                </Container>
            </div>
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Payment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Button onClick={()=>{
                                confirmBuy(localStorage.getItem('userId'))
                            }} >Offline</Button>
                            <Button onClick={()=>{
                                console.log("clicked online");
                            }} >Online</Button>
                        </DialogContentText>
                        <p></p>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}


export default CartPage;