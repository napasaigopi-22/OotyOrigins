import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';


function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    
    const location = useLocation();
    var value = location.state;
    console.log(value)
  
    if (!product) {
      return <div>Loading...</div>;
    }

    return (
        <Box sx={{ width: '100%', padding: '20px' }}>
          <Card>
            <CardMedia
              component="img"
              height="500"
              image={product.imageUrl}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h4">{product.name}</Typography>
              <Typography variant="body1">{product.description}</Typography>
              <Typography variant="h5" sx={{ mt: 2 }}>
                Price: Rs {product.cost}/-
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 3 }}>Add to Cart</Button>
            </CardContent>
          </Card>
        </Box>
      );
    }
    


export default ProductDetail;