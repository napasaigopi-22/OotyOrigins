import NavBar from "../../Assets/NavBar";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Axios from 'axios';
import { Card, CardContent, CardMedia, Container, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";





function HomePage() {

    const [categories, setcategories] = useState([]);
    const [product, setproduct] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        Axios.get('http://localhost:4000/get/categories').then(res => {
            setcategories(res.data); console.log("categories calls ", res.data)
        }).catch(function (error) {
            console.log(error);
        })
    }, []);


    useEffect(() => {
        Axios.get('http://localhost:4000/get/products').then(res => {
            setproduct(res.data); console.log("products calls ", res.data); setPageLoaded(true);
            return product;
        }).catch(function (error) {
            console.log(error);
        });
    }, [])
    console.log('call done', product);

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
                                    <a onClick={() => { redirectWithState({ state: { name: val.name } }) }} className="categoriesList" >{val.name}</a>
                                </li>
                            </>
                        })
                    }
                </ul>

                <div style={{ height: "50px" }} ></div>
                {
                    pageLoaded && (
                        <Grid2 container spacing={2} sx={{width:'100%'}} >
                            <Card sx={{ width: '48%', height: '450px', margin:'auto' }}>
                                <React.Fragment>
                                    <CardContent>
                                        <Typography sx={{ color: 'text.heading', mb: 1.5 }} variant="h4">{product[0].name}</Typography>
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={product[0].img}
                                            alt="Product Image"
                                        />
                                    </CardContent>
                                    <CardContent>
                                        <p><b>Description</b></p>
                                    </CardContent>
                                </React.Fragment>
                            </Card>
                            <Card sx={{ width: '48%', height: '450px', margin:'auto'}}>Details of product</Card>
                            <Card sx={{ width: '48%', height: '450px', margin:'auto'}}>Details of product</Card>

                            <Card sx={{ width: '48%', height: '450px',  margin:'auto'}}>
                                <React.Fragment>
                                    <CardContent>
                                        <Typography sx={{ color: 'text.heading', mb: 1.5 }} variant="h4">{product[1].name}</Typography>
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={product[1].img}
                                            alt="Product Image"
                                        />
                                    </CardContent>
                                    <CardContent>
                                        <p><b>Description</b></p>
                                    </CardContent>
                                </React.Fragment>
                            </Card>
                            
                        </Grid2>
                    )
                }

            </div>
            <div>
                footer
            </div>
            <footer>
                lvangam
            </footer>
        </>
    )
}


export default HomePage;