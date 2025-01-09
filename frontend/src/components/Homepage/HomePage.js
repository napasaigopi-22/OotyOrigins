import NavBar from "../../Assets/NavBar/NavBar";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Axios from 'axios';
import { Card, CardContent, CardMedia, Grid2, Typography, Grid, Box,Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
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
import scroll1 from '../../Assets/images/scroll1.png'
import scroll2 from '../../Assets/images/scroll2.png'
import scroll3 from '../../Assets/images/scroll3.png'
import scroll4 from '../../Assets/images/scroll4.png'
import scroll5 from '../../Assets/images/scroll5.png'
import scroll6 from '../../Assets/images/scroll6.png'
import scroll7 from '../../Assets/images/scroll7.png'
import mainpage from '../../Assets/images/mainpage.png'
import { useSelector } from "react-redux";
import store from '../../Store';
import './HomePage.css';
import zIndex from "@mui/material/styles/zIndex";
import choose from '../../Assets/images/choose.png'



function HomePage() {

    const [categories, setcategories] = useState([]);
    const [product, setproduct] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    const navigate = useNavigate();



    var imageobjs = {
        "Jewelry": item_product_1,
        "Home Decor": item_product_2,
        "Clothing": item_product_3,
        "Food & Beverages": item_product_4,
        "Handicraft": item_product_5,
        "Personal Care": item_product_6,
        "Kitchenware": item_product_7,
        "Furniture": item_product_8,
        "Toys & Games": item_product_9,
        "Organic Rice": item_product_10,

    }


    useEffect(() => {
        Axios.get('http://localhost:4000/get/categories').then(res => {
            setcategories(res.data);
            console.log("categories calls ", res.data);
        }).catch(function (error) {
            console.log(error);
        });
    }, []);


    useEffect(() => {
        Axios.get('http://localhost:4000/get/products').then(res => {
            setproduct(res.data);
            console.log("products calls ", res.data);
            setPageLoaded(true);
            return product;
        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    const redirectWithState = (val) => {
        navigate('/category', val);
    };


    return (
        <>
            <div>
                <NavBar></NavBar>
            </div>
            <Box className='homecolor'>
            <div className="HeroSection">

                <div className="header">
                    <div class="bg-image"></div>
                        <div className="header-container">
                            <Box class="text" sx={{ color: 'white', mb: 3.5, mt: 3.5 }}>Ooty Origins</Box>
                            <Box sx={{ color: 'white', fontWeight: 'bold' }}>
                                <h3>Experience the rich heritage and culture of Ooty through our tribal crafts and products.</h3>
                            </Box>
                    </div>

                </div>
            </div>
            <Container sx={{ padding: '.5% 0 0 0' }}>
            <h2 className= "shop" style={{ textAlign: 'left' }}>Shop by Category</h2>
           <hr className="solid" />
           </Container>
            <div>
                <ul >
                    {
                        categories.map((val, key) => {
                            return <>
                                <li style={{ display: 'inline-block', padding: '35px' }}>
                                    <img className="explore-categories" src={imageobjs[val.name]} width={"150px"} height={"150px"} />
                                    <a onClick={() => { redirectWithState({ state: { name: val.name } }) }} className="categoriesList" >{val.name}</a>
                                </li>
                            </>
                        })
                    }
                </ul>


        <Box
            sx={{
            background: 'rgb(41, 39, 39)',
            padding: '30px',
            marginTop: '50px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgb(0, 0, 0)',
          }}
        >
             <Typography variant="h2" color='red'  align="center" gutterBottom>
             <b>Ooty Stories</b>
             </Typography>
                <div style={{ height: "5px" }} ></div>
                <div className="slider-container">
                    <section id="image-carousel" aria-label="Beautiful Images">
                        <Splide
                            options={{
                                type: 'loop',
                                autoplay: true,
                                interval: 2500,
                                pauseOnHover: false,
                                pagination: true,
                            
                            }}
                        >
                            <SplideSlide>
                                <img src={scroll1} style={{width:"100%"}}/>
                            </SplideSlide>
                            <SplideSlide>
                                <img src={scroll2}  style= {{width:"100%"}} />
                            </SplideSlide>
                            <SplideSlide>
                                <img src={scroll3}  style= {{width:"100%"}} />
                            </SplideSlide>
                            <SplideSlide>
                                <img src={scroll4}  style= {{width:"100%"}} />
                            </SplideSlide>
                            <SplideSlide>
                                <img src={scroll5}  style= {{width:"100%"}} />
                            </SplideSlide>
                            <SplideSlide>
                                <img src={scroll6}  style= {{width:"100%"}} />
                            </SplideSlide>
                            <SplideSlide>
                                <img src={scroll7}  style= {{width:"100%"}} />
                            </SplideSlide>
                        </Splide>
                    </section>
                </div>
</Box>


        <Container sx={{ padding: '20px 0' }}>
        <Box
          sx={{
            background: 'rgb(255, 255, 255)',
            padding: '30px',
            marginTop: '50px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgb(235, 224, 224)',
          }}
        >
          <Typography variant="h4" color='black'  align="center" gutterBottom>
            <b>About Ooty Origins</b>
          </Typography>
          <Typography variant="h6" align="center">
          <span class="bold-black">OotyOrigins.com</span> is an ecommerce platform that empowers the tribal communities  of Ooty, India, by connecting them directly with customers and tourists. We pride ourselves on delivering factory-fresh products from Ooty.Enjoy the unique and authentic taste and experience every product.
          </Typography>
        </Box>
       </Container>

       
       <Container sx={{ padding: '5px 0' }}>
        <Box
          sx={{
            background: 'rgb(75, 57, 57)',
            padding: '30px',
            marginTop: '100px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgb(65, 49, 49)',
            width:'100%',
            height:'450px',
          }}
        >
       <p className="steps"><h2>Steps-To-Order</h2></p>     
       <img src={choose} style={{padding: '14px',width:"80%"}}/>
       </Box>
       </Container>

                <div style={{ height: "80px" }} ></div>
                {
                    pageLoaded && (
                        <Grid2 container spacing={2} sx={{ width: '100%' }} >
                            <Card sx={{
                                width: '450px', height: '450px', margin: 'auto',
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
                                            image={'http://localhost:4000/images/' + product[5].images[0]}
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
                                sx={{
                                    width: '450px', height: '450px', margin: 'auto', fontWeight: 'bold', padding: '20px', backgroundColor: '#f9f9f9',
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

                            <Card sx={{
                                width: '450px', height: '450px', margin: 'auto', fontWeight: 'bold', padding: '20px', backgroundColor: '#f9f9f9',
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


                            <Card sx={{
                                width: '450px', height: '450px', margin: 'auto',
                                backgroundColor: '#f9f9f9',
                                border: '2px solid gold',
                                borderRadius: '10px',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
                            }}>
                                <React.Fragment>
                                    <CardContent>
                                        <Typography sx={{ color: 'text.heading', mb: 1.5 }} variant="h4">{product[4].name}</Typography>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={'http://localhost:4000/images/' + product[4].images[0]}
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
            </Box>

        </>
    )
}


export default HomePage;