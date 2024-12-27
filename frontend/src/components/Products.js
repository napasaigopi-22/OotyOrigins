import { Box, Grid2, Typography, Slider } from "@mui/material";
import NavBar from "../Assets/NavBar/NavBar";
import Product from "../Assets/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import './Products.css';



function Products() {
    const [product, setproduct] = useState([])
    const [priceRange, setPriceRange] = useState([0, 1500]);
    const [rating, setRating] = useState([1, 5]);

    useEffect(() => {
        axios.get('http://localhost:4000/get/products').then(res => {
            setproduct(res.data);
            console.log("get products is ",res.data)
        }).catch(function (error) {
            console.log(error);
        })
    }, []);

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
        console.log("Updated Price Range:", newValue);
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
        console.log("Updated Rating Range:", newValue);
    };

    return (
        <>
            <NavBar></NavBar>
            <div className="product-page-container">
                {/* Filter Section */}
                <Box className="filter-section cardproductui ">
                    <Typography variant="h5" gutterBottom>
                        Filter by

                    </Typography>

                    {/* Price Range Filter */}
                    <Box className='filter-box'>
                        <Typography gutterBottom>Price Range</Typography>
                        <Slider
                            value={priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={1500}
                            className="slider"
                        />
                        <Typography>₹{priceRange[0]} - ₹{priceRange[1]}</Typography>
                    </Box>

                    {/* Rating Filter */}
                    <Box className='filter-box'>
                        <Typography gutterBottom>Rating</Typography>
                        <Slider
                            value={rating}
                            onChange={handleRatingChange}
                            valueLabelDisplay="auto"
                            min={1}
                            max={5}
                            step={0.5}
                            className="slider"
                        />
                        <Typography>{rating[0]} - {rating[1]} Stars</Typography>

                    </Box>
                </Box>



                <Box className="product-grid-container">
                    <Grid2
                        container
                        spacing={3}

                    >
                        {
                            product
                                .filter(

                                    (val) =>
                                        val.price >= priceRange[0] &&
                                        val.price <= priceRange[1] &&
                                        val.rating >= rating[0] &&
                                        val.rating <= rating[1]
                                )


                                .map((val, key) => {
                                    return <Grid2
                                            item
                                            xs={12} sm={6} md={4}
                                            key={key}
                                            className="product-grid-item"
                                        >
                                            <Product
                                                prdId={val.productId}
                                                name={val.name}
                                                cost={val.price}
                                                stock={val.stock}
                                                rating={val.rating}
                                                imageUrl={val.images}
                                                style={{ flex: 1 }}
                                            />
                                        </Grid2>
                                })}
                    </Grid2>
                </Box>
            </div>
        </>
    );
}

export default Products;