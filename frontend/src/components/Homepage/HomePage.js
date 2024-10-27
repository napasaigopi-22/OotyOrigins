import NavBar from "../../Assets/NavBar";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Axios from 'axios';
import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../../Assets/Header.css';
import item_product_1 from '../../Assets/images/item_product_1.png'
import item_product_2 from '../../Assets/images/item_product_2.png'
import item_product_3 from '../../Assets/images/item_product_3.png'
import item_product_4 from '../../Assets/images/item_product_4.png'
import item_product_5 from '../../Assets/images/item_product_5.png'
import item_product_6 from '../../Assets/images/item_product_6.png'
import item_product_7 from '../../Assets/images/item_product_7.png'
import item_product_8 from '../../Assets/images/item_product_8.png'
import item_product_9 from '../../Assets/images/item_product_9.png'
import item_product_10 from '../../Assets/images/item_product_10.png'



function HomePage() {

    const [categories, setcategories] = useState([]);
    const [product, setproduct] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    const navigate = useNavigate();



    var imageobjs={
        "Jewellry":item_product_1,
        "Organic Rice":item_product_2,
        "Clothing":item_product_3,
        "Food & Beverages":item_product_4,
        "Handicraft":item_product_5,
        "Personal Care":item_product_6,
        "Kitchenware":item_product_7,
        "Furniture":item_product_8,
        "Toys & Games":item_product_9,
        "Home Decor":item_product_10,
    }

    
    

    useEffect(() => {
        Axios.get('http://localhost:4000/get/categories').then(res => {
            setcategories(res.data); 
            console.log("categories calls ", res.data);
        }).catch(function (error) {
            console.log(error);
        });
    },[]);


    useEffect(() => {
        Axios.get('http://localhost:4000/get/products').then(res => {
            setproduct(res.data); 
            console.log("products calls ", res.data); 
            setPageLoaded(true);
            return product;
        }).catch(function (error) {
            console.log(error);
        });
    },[]);

    const redirectWithState = (val) => {
        navigate('/category', val);
    };


    return (
        <>
            <div>
                <NavBar></NavBar>
            </div>
            <div className="HeroSection">
                <div className="header">
                    <div className="header-container">
                <Typography sx={{ color: 'white', mb: 2.5, mt: 2.5 }} variant="h1">Ooty Origins</Typography>
                <Typography variant="h6" sx={{ color: 'white' }}>
                        Experience the rich heritage and culture of Ooty through our tribal crafts and products.
                    </Typography>
                </div>
                </div>
            </div>
            <div>

                <ul >
                    {
                        categories.map((val, key) => {
                            return <>
                                <li style={{ display: 'inline-block', padding: '35px', height: '50px' }}>
                                    <img className="explore-categories" src={imageobjs[val.name]} width={"130px"} height={"130px"} />
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
        
        </>
    )
}


export default HomePage;