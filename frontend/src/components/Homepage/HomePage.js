import NavBar from "../../Assets/NavBar/NavBar";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Axios from 'axios';
import { Card, CardContent, CardMedia, Grid2, Typography, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";


import explorecategories from '../../components/Explorecategories/Explorecategories.css'
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
import { useSelector } from "react-redux";
import store from '../../Store';
import './HomePage.css';
import zIndex from "@mui/material/styles/zIndex";




function HomePage() {

    const [categories, setcategories] = useState([]);
    const [product, setproduct] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    const navigate = useNavigate();



    var imageobjs={
        "Jewelry":item_product_1,
        "Home Decor":item_product_2,
        "Clothing":item_product_3,
        "Food & Beverages":item_product_4,
        "Handicraft":item_product_5,
        "Personal Care":item_product_6,
        "Kitchenware":item_product_7,
        "Furniture":item_product_8,
        "Toys & Games":item_product_9,
        "Organic Rice":item_product_10,
       
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
                <Box class = "text" sx={{ color: 'green', mb: 3.5, mt: 3.5, fontSize: 140,fontWeight: 'bold' }}>Ooty Origins</Box>
                <Typography variant="h5" sx={{ color: 'black',fontWeight: 'bold' }}>
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
                            <Card sx={{ width: '450px', height: '450px', margin:'auto', 
                                backgroundColor: '#f9f9f9', 
                                border: '2px solid gold', 
                                borderRadius: '10px',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
                                }}>
                                <React.Fragment>
                                    <CardContent>
                                        <Typography sx={{ color: 'text.heading', mb: 1.5 }} variant="h4">{product[5].name}</Typography>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={'http://localhost:4000/images/'+product[5].images[0]}
                                            alt="Product Image"
                                        />
                                        
                                    </CardContent>
                                    <CardContent >
                                    <Typography sx={{ color: 'red', fontWeight: 'bold' }}>
                                    The wooden carved elephant is a symbol of intricate tribal artistry.</Typography>
                                    </CardContent>
                                </React.Fragment>
                            </Card>
                        <Card 
                        sx={{  width: '415px',height: '400px',margin: 'auto',fontWeight: 'bold',padding: '20px',backgroundColor: '#f9f9f9',  
                            border: '1px solid black', 
                            borderRadius: '10px',  
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',  
                            }}>

                             <Typography variant="h5" component="h2" sx={{ marginBottom: '35px' }}>
                                Details of Product:
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ marginBottom: '25px' }}>
                                <strong>Material:</strong> Crafted from high-quality, sustainably sourced wood.
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ marginBottom: '25px' }}>
                                <strong>Craftsmanship:</strong> Each elephant is hand-carved by skilled artisans, using age-old techniques passed down through generations.
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ marginBottom: '25px' }}>
                                <strong>Design:</strong> The intricate patterns often depict tribal motifs that reflect the rich heritage of the artisans' communities.
                            </Typography>
                            <Typography variant="body1" component="p">
                                <strong>Size and Finish:</strong> Available in various sizes, with a smooth, polished finish that enhances the natural beauty of the wood.
                            </Typography>
                        </Card>

                        <Card sx={{  width: '415px',height: '400px',margin: 'auto',fontWeight: 'bold',padding: '20px',backgroundColor: '#f9f9f9',  
                            border: '1px solid black', 
                            borderRadius: '10px',  
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',  
                            }}>

                            <Typography variant="h5" component="h2" sx={{ marginBottom: '35px' }}>
                                Details of Product:
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ marginBottom: '25px' }}>
                                <strong>Material:</strong> Made from natural clay and glazed for durability and aesthetic appeal.
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ marginBottom: '25px' }}>
                                <strong>Craftsmanship:</strong> Each piece is handcrafted by tribal artisans, showcasing traditional techniques and artistry.
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ marginBottom: '25px' }}>
                                <strong>Design:</strong> Features unique patterns and colors that reflect the cultural heritage of the artisans' community.
                            </Typography>
                            <Typography variant="body1" component="p">
                                <strong>Functionality:</strong> Perfect for serving food, displaying decor, or as a collectible art piece.
                            </Typography>
                        </Card>


                            <Card sx={{  width: '450px', height: '450px', margin:'auto', 
                                backgroundColor: '#f9f9f9', 
                                border: '2px solid gold', 
                                borderRadius: '10px',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'}}>
                                <React.Fragment>
                                    <CardContent>
                                        <Typography sx={{ color: 'text.heading', mb: 1.5 }} variant="h4">{product[4].name}</Typography>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={'http://localhost:4000/images/'+product[4].images[0]}
                                            alt="Product Image"
                                        />
                                    </CardContent>
                                    <CardContent>
                                    <Typography sx={{ color: 'red', fontWeight: 'bold' }}>
                                    The tribal pottery set embodies traditional craftsmanship.</Typography>
                                    </CardContent>
                                </React.Fragment>
                            </Card>
                            
                        </Grid2>
                    )
                }

            </div>

            {/* <div className="developers-section">
                <Typography variant="h4" className="section-title" sx={{ fontWeight: 'bold', color: 'text.heading', mb: 1.5 }}>Meet the Guide and Developers</Typography>
                
                <Grid container spacing={0.1}>
                    {developers.map((dev, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card className="developer-card">
                                <CardMedia
                                    component="img"
                                    className="developer-photo"
                                    image={dev.image}
                                    alt={`${dev.name}'s photo`}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ color: 'green', fontWeight: 'bold' }}>{dev.name}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ color: 'voilet', fontWeight: 'bold' }}>
                                        {dev.role}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div> */}
        
        </>
    )
}


export default HomePage;