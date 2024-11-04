import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import {useParams} from "react-router-dom"''
import { Box, Typography, Card, CardMedia, CardContent, Button, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import "../components/ProductDetail.css";
import NavBar from "../Assets/NavBar";



function ProductDetail() {
    // const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [Opensnackbar, setOpenSnackbar ] = useState(false);
    const [msg, setMsg] = useState("");
    const location = useLocation();
    var value = location.state;
    console.log(value)

    useEffect(()=>{
      axios.post('http://localhost:4000/get/GetproductById',{"id":value}).then(res => {
        setProduct(res.data[0]);
        console.log("categories ======== ", product);
    }).catch(function (error) {
        console.log(error);
    });
    }, [value]);

    const handleAddToCart = () => {
      const userId = localStorage.getItem("userId");
      if (userId && product) {
          axios.post('http://localhost:4000/post/addToCart', { productId: product, userId })
              .then(() => {
                  setMsg("Product added to cart successfully!");
                  setOpenSnackbar(true);
              })
              .catch(error => {
                  console.log(error);
              });
      } else {
          setMsg("Please log in to add items to your cart.");
          setOpenSnackbar(true);
      }
  };

  const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      setOpenSnackbar(false);
  };
  
    if (!product) {
      return <div><h1>Loading....</h1></div>;
    }

    return (
      <>
      <NavBar></NavBar>
        <Box sx={{ width: '97%', padding: '20px' }}>
          <Card sx={{ boxShadow: 3, borderRadius: '15px', overflow: 'hidden' }}>
            <Card className= "product-card">
            <CardMedia
              component="img"
              height="400"
              image={`http://localhost:4000/images/${product.image || 'imageUrl.jpg'}`}
              alt="product image"
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h4" className="product-name" sx={{ fontWeight: 'bold', color: '#333' }} >{product.name}</Typography>
              <Typography variant="body1" className="product-description" sx={{ color: '#666', mt: 1 }}>{product.description}</Typography>
              <Typography variant="h5"className="product-price" sx={{ mt: 2, color: '#3f51b5'}}>
                Price: Rs {product.price}/-
                </Typography>
              <Typography variant="h5" className="product-rating" sx={{ mt: 1,color: '#ff9800' }}>
                Rating: {product.rating}
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 3, borderRadius: '10px' }}>Add to Cart</Button>
            </CardContent>
            </Card>
          </Card>
        </Box>
        <Snackbar 
            open= {Opensnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={msg}
            action={
              <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleCloseSnackbar}
              >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                }
                />
        </>
      );
    }
    


export default ProductDetail;