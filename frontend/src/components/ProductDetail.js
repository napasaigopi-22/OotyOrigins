import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import {useParams} from "react-router-dom"''
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import axios from "axios";


function ProductDetail() {
    // const { id } = useParams();
    const [product, setProduct] = useState(null);
    
    const location = useLocation();
    var value = location.state;
    console.log(value)

    useEffect(()=>{
      axios.post('http://localhost:4000/get/GetproductById',{"id":value}).then(res => {
        setProduct(res.data[0]);
        console.log("categories ======== ", product)
    }).catch(function (error) {
        console.log(error);
    })
    })
  
    if (!product) {
      return <div><h1>Loading....</h1></div>;
    }

    return (
      
        <Box sx={{ width: '97%', padding: '20px' }}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.imageUrl}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h4">{product.name}</Typography>
              <Typography variant="body1">{product.description}</Typography>
              <Typography variant="h5" sx={{ mt: 2 }}>
                Price: Rs {product.price}/-
                </Typography>
              <Typography variant="h5" sx={{ mt: 2 }}>
                Rating: {product.rating}
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 3 }}>Add to Cart</Button>
            </CardContent>
          </Card>
        </Box>
      );
    }
    


export default ProductDetail;