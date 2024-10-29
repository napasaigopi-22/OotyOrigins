import { Box, Card, CardActions, CardContent, Button, Typography, Rating, Snackbar, IconButton, CardMedia } from '@mui/material';
import * as React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Product.css';
import { Provider } from 'react-redux'
import store from '../Store';
// import fs ;




export default function Product(props) {

    const [prd, setPrd] = React.useState("");
    const [msg,setMsg] = React.useState("Added To Cart Succesfully");
    const [token, setToken] = React.useState("");
    const [user,setuser] = React.useState({});
    const url = "src/Assets/images/";

    const reader = new FileReader();

    const navigate = useNavigate();

    React.useEffect(() => {
        setPrd(props.prdId);
    },[props.prdId]);

    React.useEffect(() => {
        setToken(localStorage.getItem('Token'));
        axios.post('http://localhost:4000/get/users',{"username":localStorage.getItem('username')}).then(res => {
            console.log("isUser ======== ", res.data);
            setuser(res.data);
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
        if(token) {
            var qty;
            axios.post('http://localhost:4000/post/showCart', { userId: localStorage.getItem("userId") }).then(res => {
                if(res.data.length>0){
                qty=res.data[0].products.filter(ele=>ele.productId==prd);
                if(qty.length!=0)
                    axios.post("http://localhost:4000/post/addQuantityToProduct", { productId: prd, userId: luserid, additionalQuantity: 1 }).then(res => {
                        setMsg("Added To Cart Succesfully");
                    }).catch(function (error) {
                        console.log(error);
                    });
                else
                    axios.post("http://localhost:4000/post/addToCart",{productId:prd,userId:luserid}).then(res => {
                        setMsg("Added To Cart Succesfully");
                    }).catch(function (error) {
                        console.log(error);
                    });}
                    else
                    {
                        console.log("no data");
                        axios.post("http://localhost:4000/post/addToCart",{productId:prd,userId:luserid}).then(res => {
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

    const handleProdClick = () =>{
        navigate('/ProductDetail',{state:prd});
    }
    return (
        <Box sx={{ width: 300, height:500, margin: '2px' }}>
            
            <Card  sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
               
                    <CardContent onClick={handleProdClick} sx={{ flexGrow: 1, cursor: 'pointer' }}>
                        <Typography sx={{ color: 'text.heading', mb: 1.5 }} variant="h5">{props.name}</Typography>
                        <img 
                            // src={url+props.imageUrl[0]}
                            src={'http://localhost:4000/images/'+props.imageUrl[0]}
                            alt="Product Image"
                            style={{ height: '250px',width: '100%', objectFit: 'cover', borderRadius: '2px' }}
                        />
                        <Typography variant="body2" sx={{ textAlign: 'right', color: 'black', fontWeight: 'bold' }}> ₹ {props.cost}/-</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold', mr: 1 }}>
                            Rating:
                            </Typography>
                            <Rating name="product-rating" value={props.rating} precision={0.5} readOnly />
                            
                        </Box>
                        <Box>
                            
                        <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold', mr: 1 }}>
                             {props.stock} left
                            </Typography>
                        </Box>
                    </CardContent>
                    {((user.IsUser && localStorage.getItem('Token') || !localStorage.getItem('Token') )) && 
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button onClick={addToCart} startIcon={<AddShoppingCartIcon />} variant="contained" color="success" size="large">Add To Cart</Button>
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

