import { Box, Grid2 } from "@mui/material";
import NavBar from "../Assets/NavBar";
import Product from "../Assets/Product";
import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
    const [product, setproduct] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/get/products').then(res => {
            setproduct(res.data);
        }).catch(function (error){
            console.log(error);
        })
    }, []);

    
    return (
        <>
            <NavBar></NavBar>
            <h1>Products Page</h1>
            <Box sx={{ flexGrow: 1 }}>
            <Grid2
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                style={{ margin: "auto", width: '90%'}}
            >
                {
                    product.map((val, key) => {
                        return <Grid2 item xs={4} size={4} >
                            <Product style={{ margin: 'auto' }} prdId={val.productId} name={val.name} cost={val.price} stock={val.stock}  ></Product>
                        </Grid2>
                    })
                }
            </Grid2>
            </Box>
        </>
    )
}

export default Products;