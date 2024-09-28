import NavBar from "../NavBar";
import Product from "../Product";
import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { Box, Grid, Typography } from "@mui/material";

function HomePage() {

    const [categories, setcategories] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:4000/get/categories').then(res => {
            console.log(res.data);
            setcategories(res.data)
        })
    }, []);

    const [product, setproduct] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:4000/get/products').then(res => {
            console.log(res.data);
            setproduct(res.data);
        })
    }, [])
    return (
        <>
            <div>
                <NavBar></NavBar>
            </div>
            <div className="HeroSection">
                <Typography sx={{ color: 'text.heading', mb: 2.5, mt:2.5 }} variant="h1">OotyOrigins</Typography>
            </div>
            <div>

                <ul >
                    {
                        categories.map((val, key) => {
                            return <>
                                <li style={{ display: 'inline-block', padding: '10px' }}><a className="categoriesList" href="">{val.name}</a></li>
                            </>
                        })
                    }
                </ul>

<div style={{height:"50px"}} ></div>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        style={{margin:"auto",width:'90%'}}
                    >
                        {
                            product.map((val, key) => {
                                return <Grid item xs={4}>
                                    <Product style={{margin:'auto'}} name={val.name} cost={val.price} stock={val.stock}  ></Product>
                                </Grid>
                            })
                        }
                    </Grid>
                {/* </Box> */}
            </div>
            <div>
                footer
            </div>
        </>
    )
}


export default HomePage;