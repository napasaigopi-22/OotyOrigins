import React, { useState } from 'react';
import Axios  from 'axios';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PaymentForm(props) {
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    React.useEffect(()=>{
        props.cart.paymentMethod = "Offline"
    })

    const handlePayment = async (e) => {
        console.log("cart in payment form is ==",props.cart);
         props.cart.paymentMethod = "Online";
        e.preventDefault();
        Axios.post('http://localhost:4000/post/CreateOrder', props.cart).then(reso => {
            e.preventDefault();
            Axios.post('http://localhost:4000/post/orderproducct',{amount:props.cart.totalAmount}).then(res=>{
                e.preventDefault();
                navigate('/Orders', { state: reso.data });
            })
            
        }).catch(error=>{
            console.log(error)
        });
    }

    return (<>
        <Container>
            <Box
                component="form"
                sx={{
                    mt: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Complete Your Payment
                </Typography>

                <TextField
                    label="Card Number"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    fullWidth
                />

                <TextField
                    label="CVV"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    fullWidth
                />

                <TextField
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                />

                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                />

                <TextField
                    label="Phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    fullWidth
                />

                <Button variant="contained" color="primary" type="submit" fullWidth onClick={handlePayment}
                >
                    Pay Now
                </Button>
            </Box>
        </Container>
    </>
    );

}

export default PaymentForm;