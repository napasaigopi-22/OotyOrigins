import Axios from "axios";
import NavBar from "../../Assets/NavBar/NavBar";
import PropTypes from 'prop-types';
import React, { useState } from "react";
import { Box, Container, Divider, Typography, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, Tab, Tabs, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
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
            console.log("show cart resp is ", res.data[0])
        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    const confirmBuy = (userId) => {
        handleClickOpen();
    }

    const clickedPlaceOrder=(user)=>{
        cart.paymentMethod = "Offline";
        console.log("cartcart is is ===================== ",cart)
        Axios.post('http://localhost:4000/post/CreateOrder', cart).then(res => {
            navigate('/Orders', { state: res.data });
        }).catch(error=>{
            console.log(error);
        });
    }
    return (
        <>
            <NavBar />
          
            <div>
                <Container  maxWidth='lg' sx={{ marginTop: '26px', padding: '1px 0',marginBottom:'26px'}} >
                    <Card  maxWidth="md" >
                        <h2 className='center' fullWidth style={{width: '100%', height: '60px', textAlign: 'center', fontSize: '30px',fontFamily: 'sans-serif' }}> 
                            Shopping Cart</h2>
                            <hr className='' />
                        {products.map((ele, i) => {
                            return (
                                <Box key={i} sx={{ textAlign: 'center', margin: 'auto' }} className='center' fullWidth>
                                        <Grid container >
                                            <Grid size='grow' ml={8}>
                                                <CartProduct name={ele.name} price={ele.price} quantity={ele.quantity} /></Grid>
                                            <Grid size="grow" ><p>collect at {ele.sellerAddress && ele.sellerAddress.street}</p></Grid>
                                        </Grid>
                                    
                                </Box>)
                        })}

                       <hr className='' />
                        <Grid container className='center' fullWidth>
                            <Grid size="grow" >
                                <Button variant="contained" sx={{ backgroundColor: 'red', fontWeight: 'bold', padding: '10px 20px', }} 
                                onClick={() => { confirmBuy(localStorage.getItem('userId')) }}>Confirm buy</Button>
                            </Grid>
                            <Grid size="grow" >
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }} >
                                    Total: ₹ {totalAmount}
                                </Typography>
                            </Grid>
                        </Grid>
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