import { Box, Card, CardActions, CardContent, Button, Typography, Rating, Snackbar, IconButton, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid2'
import * as React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Product.css';
import { Provider } from 'react-redux'
import store from '../Store';
import { pink } from '@mui/material/colors';
// import fs ;




export default function Product(props) {

    const [prd, setPrd] = React.useState("");
    const [msg, setMsg] = React.useState("Added To Cart Succesfully");
    const [token, setToken] = React.useState("");
    const [user, setuser] = React.useState({});
    const url = "src/Assets/images/";

    const reader = new FileReader();

    const navigate = useNavigate();

    React.useEffect(() => {
        setPrd(props.prdId);
    }, [props.prdId]);

    React.useEffect(() => {
        setToken(localStorage.getItem('Token'));
        console.log("localStorage.getItem('username') ===", localStorage.getItem('username'))
        axios.post('http://localhost:4000/get/users', { "username": localStorage.getItem('username') }).then(res => {
            console.log("isUser ======== ", res.data, "stuff");
            setuser(res.data[0]);
        }).catch(function (error) {
            console.log(error);
        })
    }, [token]);

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const addToCart = () => {
        var luserid = localStorage.getItem("userId");
        console.log("luserid is  =====-----~~~~~~", luserid)
        if (token) {
            var qty;
            axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") }).then(res => {
                if (res.data.length > 0) {
                    qty = res.data[0].products.filter(ele => ele.productId == prd);
                    if (qty.length != 0)
                        axios.post("http://localhost:4000/post/addQuantityToProduct", { productId: prd, userId: luserid, additionalQuantity: 1 }).then(res => {
                            setMsg("Added To Cart Succesfully");
                        }).catch(function (error) {
                            console.log(error);
                        });
                    else
                        axios.post("http://localhost:4000/post/addToCart", { productId: prd, userId: luserid }).then(res => {
                            setMsg("Added To Cart Succesfully");
                        }).catch(function (error) {
                            console.log(error);
                        });
                }
                else {
                    console.log("no data");
                    axios.post("http://localhost:4000/post/addToCart", { productId: prd, userId: luserid }).then(res => {
                        setMsg("Added To Cart Succesfully");
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });

        }
        else setMsg("Please Login to continue")
        handleClick();
    }

    const handleProdClick = () => {
        navigate('/ProductDetail', { state: props });
    }
    
    return (

     

        <Box sx={{ width: 250, height: 440, margin: '4px' }} >
            <Card className='cardproductui' sx={{ height: '85%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                <CardContent p={0} onClick={handleProdClick} sx={{ flexGrow: 1, cursor: 'pointer' }}>

                    <img
                    className='cardProdImg'
                        // src={url+props.imageUrl[0]}
                        src={'http://localhost:4000/images/' + props.imageUrl[0]}
                        alt="Product Image"
                        style={{ height: '175px', width: '100%', objectFit: 'cover', borderRadius: '2px' }}
                    />
                
                    <p style={{ fontWeight: '1000', fontSize: '15px',padding:'15px' }} >{props.name}</p>
                    <Grid p={0} container spacing={2}>
                        <Grid size={8}  >
                            <div style={{ textAlign: 'left' }} >
                                <Typography variant="h7" sx={{ textAlign: 'right', color: 'red', fontWeight: 'bold' }}> ₹ {props.cost}/-</Typography>
                            </div>
                        </Grid>
                        <Grid style={{ textAlign: 'right' }}>
                            <div style={{ textAlign: 'left' }} >
                                <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold', mr: 1, margin: 'auto' }} style={{ textAlign: 'right' }}   >
                                    {props.stock} left
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                   

                </CardContent>
                {((user && user.IsUser) && localStorage.getItem('Token') || !localStorage.getItem('Token')) &&
                    
                        <CardActions sx={{ justifyContent: 'center', height:'50%' }} >
                            <Button className='prodAddToCart' variant='contained' color='success' style={{borderRadius:'15px'}} >
                            <IconButton onClick={addToCart} variant="contained" m={0} sx={{ color: 'white' }}  size="small">
                                <AddShoppingCartIcon variant="contained" size="large" />
                            </IconButton>
                            </Button>
                        </CardActions>
                    
                }

            </Card>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={msg}
                action={action}
            />
        </Box>
    );
}

