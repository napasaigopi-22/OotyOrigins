import Axios from "axios";
import NavBar from "../../Assets/NavBar";
import PropTypes from 'prop-types';
import React, { useState } from "react";
import { Box, Container, Divider, Typography, Grid, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, Tab, Tabs, TextField } from "@mui/material";
import { Card, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import CartProduct from "./Cartproducts";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../../Assets/PaymentForm";


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


function CartPage() {
    const [products, setProducts] = React.useState([]);
    const [totalAmount, setTotalAmount] = React.useState(0);
    const [cart, setCart] = React.useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handlePayment=()=>{
        console.log("handlepayment")

    }

    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        Axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") }).then(res => {
            setCart(res.data[0]);
            setProducts(res.data[0].products);
            setTotalAmount(res.data[0].totalAmount);
        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    const confirmBuy = (userId) => {
        handleClickOpen();
    }

    const clickedPlaceOrder=(user)=>{
        cart.paymentMethod = "Offline";
        Axios.post('http://localhost:4000/post/CreateOrder', cart).then(res => {
            Axios.post('http://localhost:4000/post/orderproducct',{amount:res.data.totalAmount}).then(res=>{
            })
            navigate('/Orders', { state: res.data });
        }).catch(error=>{
            console.log(error);
        });
    }
    return (
        <>
            <NavBar />
            <div>
                <Container maxWidth="md">
                    <Card maxWidth="md">
                        <h2>Shopping Cart</h2>
                        <Divider sx={{ my: 1 }} />
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
                        <Grid container spacing={2} alignItems="left">
                            <Grid item xs={4} md={6}>
                                <Button variant="contained" sx={{ backgroundColor: 'red', fontWeight: 'bold', padding: '10px 20px', }} onClick={() => { confirmBuy(localStorage.getItem('userId')) }} >Confirm buy</Button>
                            </Grid>
                            <Grid item xs={6} >
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }} >
                                    Total: ₹ {totalAmount}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 1 }} />
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
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Online" {...a11yProps(0)} />
                                <Tab label="Offline" {...a11yProps(1)} />
                                {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <PaymentForm cart={cart}></PaymentForm>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Button onClick={() => {
                                clickedPlaceOrder(localStorage.getItem('userId'))
                            }} >Place Order</Button>
                        </CustomTabPanel>
                        {/* <CustomTabPanel value={value} index={2}>
                            Item Three
                        </CustomTabPanel> */}
                        <DialogContentText>
                            
                            
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