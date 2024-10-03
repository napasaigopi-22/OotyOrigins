import NavBar from "../NavBar";
import Product from "../Product";
import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {

    const [categories, setcategories] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        Axios.get('http://localhost:4000/get/categories').then(res => {
            setcategories(res.data)
        }).catch(function (error){
            console.log(error);
        })
    }, []);

    const [product, setproduct] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:4000/get/products').then(res => {
            setproduct(res.data);
        }).catch(function (error){
            console.log(error);
        })
    }, []);

    const redirectWithState = (val) => {
        navigate('/category', val);
      };

    return (
        <>
            <div>
                <NavBar></NavBar>
            </div>
            <div className="HeroSection">
                <Typography sx={{ color: 'text.heading', mb: 2.5, mt: 2.5 }} variant="h1">OotyOrigins</Typography>
            </div>
            <div>

                <ul >
                    {
                        categories.map((val, key) => {
                            return <>
                                <li style={{ display: 'inline-block', padding: '10px' }}>
                                    <a onClick={() =>{redirectWithState({state:{name: val.name}})}} className="categoriesList" >{val.name}</a>
                                </li>
                            </>
                        })
                    }
                </ul>

                <div style={{ height: "50px" }} ></div>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    style={{ margin: "auto", width: '90%' }}
                >
                    {
                        product.map((val, key) => {
                            return <Grid item xs={4}>
                                <Product style={{ margin: 'auto' }} name={val.name} cost={val.price} stock={val.stock}  ></Product>
                            </Grid>
                        })
                    }
                </Grid>
            </div>
            <div>
                footer
            </div>
        </>
    )
}


export default HomePage;