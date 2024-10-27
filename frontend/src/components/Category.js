import { useLocation } from "react-router-dom";
import NavBar from "../Assets/NavBar";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Box, Grid2 } from "@mui/material";
import Product from "../Assets/Product";
import Tribal_beaded_necklace from "../Assets/images/Tribal_beaded_necklace.png";

function Category() {
    const location = useLocation();
    var value = location.state;
    console.log(value.name);
    const [product, setproduct] = useState([]);
    const [showProd, setshowProd] = useState([]);
    // const [loaded, setloaded] = useState(false);



    const imageUrl={
        "Tribal_beaded_necklace":Tribal_beaded_necklace,
    };

    useEffect(() => { 
        Axios.get('http://localhost:4000/get/products').then(res => {
            setproduct(res.data);
            console.log("product called ",product,"==setted prods==",res.data);
            setshowProd(product.filter(ele=> ele.category === value.name));
        }).catch(function (error) {
            console.log(error);
        });
    });

    useEffect(() => {
        Axios.get('http://localhost:4000/get/products').then(res => {
            setproduct(res.data);
            console.log("product called ",product,"==setted prods==",res.data);
            setshowProd(product.filter(ele=> ele.category === value.name));
            // setloaded(true);
        }).catch(function (error) {
            console.log(error);
        });
    });


    return (
        <>
            <NavBar></NavBar>
            <div>
                <h1>Category Page</h1>
                <h5>{value.name}</h5>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid2
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        style={{ margin: "auto", width: '90%' }}
                    >
                        {
                            showProd.map((val, key) => {
                                const imageSrc = imageUrl[val.name] || val.imageUrl || "";
                                return <Grid2 item xs={4} size={4} >
                                    <Product style={{ margin: 'auto' }}
                                            prdId={val.productId} 
                                            name={val.name} 
                                            cost={val.price} 
                                            stock={val.stock} 
                                            rating= {val.rating} 
                                            image= {imageSrc}>

                                    </Product>
                                </Grid2>
                            })
                        }
                    </Grid2>
                </Box>
            </div>
        </>
    )
}

export default Category;