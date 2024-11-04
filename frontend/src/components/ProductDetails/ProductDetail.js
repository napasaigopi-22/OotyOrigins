import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import {useParams} from "react-router-dom"''
import { Box, Card, CardActions, CardContent, Button, Typography, Rating, Snackbar, IconButton, CardMedia, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import NavBar from "../../Assets/NavBar";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import '../ProductDetails/ProductDetail.css';


function ProductDetail() {
    // const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [msg,setMsg] = React.useState("Added To Cart Succesfully");

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
    
    const location = useLocation();
    var value = location.state;
    console.log(value)

    useEffect(()=>{
      axios.post('http://localhost:4000/get/GetproductById',{"id":value.prdId}).then(res => {
        setProduct(res.data[0]);
        console.log("categories ======== ", product);
    }).catch(function (error) {
        console.log(error);
    })
    },[]);
  
    if (!product) {
      return <div><h1>Loading....</h1></div>;
    }

    const addToCart = () => {
      var luserid = localStorage.getItem("userId");
      var token = localStorage.getItem("token");
      var prd = value.productId;
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

    return (
      <>
      <NavBar></NavBar>
        <Box sx={{ width: '97%', padding: '20px' }}>
          <Card sx={{ boxShadow: 3, borderRadius: '15px', overflow: 'hidden' }}>
            <card className= "product-card">
            <CardMedia 
              component="img"
              height="400"
              src={'http://localhost:4000/images/'+value.imageUrl[0]}
              alt={product.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent style={{margin:'auto'}}>
              <Typography variant="h4" className="product-name" sx={{ fontWeight: 'bold', color: '#333' }} >{product.name}</Typography>
              <Typography variant="body1" className="product-description" sx={{ color: '#666', mt: 1 }}>{product.description}</Typography>
              <Typography variant="h5"className="product-price" sx={{ mt: 2, color: '#3f51b5'}}>
                Price: Rs {product.price}/-
                </Typography>
              <Typography variant="h5" className="product-rating" sx={{ mt: 1,color: '#ff9800' }}>
                Rating: {product.rating}
              </Typography>
              <Button onClick={addToCart} startIcon={<AddShoppingCartIcon />} variant="contained" color="success" size="large">Add To Cart</Button>
              </CardContent>
            </card>
          </Card>
        </Box>
        <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={msg}
                action={action}
            />
       
        </>
      );
    }
    


export default ProductDetail;