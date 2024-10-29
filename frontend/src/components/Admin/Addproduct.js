import React, { useState } from 'react';
import { TextField, Button, Typography, Box, IconButton, styled, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

const Container = styled(Grid)(({ theme }) => ({
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
        padding: '3rem',
    },
}));

const CardContainer = styled(Card)({
    padding: '1.5rem',
    width: '100%',
    maxWidth: '700px', // Wider on larger screens
    margin: 'auto',
});

export default function AddProduct() {
    const [categories, setcategories] = React.useState([]);
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        productName: '',
        stock: '',
        price: '',
        category: '',
        description: '',
        image: null,
    });

    React.useEffect(() => {
        axios.get('http://localhost:4000/get/categories').then(res => {
            setcategories(res.data);
            console.log("categories", res.data)
        }).catch(function (error) {
            console.log(error);
        })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleFileChange = (e) => {
        setProductData({ ...productData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productData.productName);
        formData.append('stock', productData.stock);
        formData.append('price', productData.price);
        formData.append('category', productData.category);
        formData.append('description', productData.description);
        formData.append('image', productData.image);
        formData.append('uploadedBy', localStorage.getItem("userId"));

        try {
            await axios.post('http://localhost:4000/post/AddProduct', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Product added successfully');
        } catch (error) {
            console.error('Error uploading product', error);
            alert('Failed to add product');
        }
    };

    return (
        <Container container>
            {/* {JSON.stringify(categories)} */}

            <Grid item xs={12} md={8} lg={6}>
                <CardContainer elevation={3}>
                    <CardContent>
                        
                        <Typography variant="h5" align="center" gutterBottom>
                            Add New Product
                        </Typography>
                        <StyledForm onSubmit={handleSubmit} encType="multipart/form-data">
                            <Grid container spacing={2}>
                                <Grid>
                                    <TextField
                                        label="Product Name"
                                        name="productName"
                                        value={productData.productName}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    /></Grid>
                                <Grid>
                                    <TextField
                                        label="Stock"
                                        name="stock"
                                        type="number"
                                        value={productData.stock}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    /></Grid>
                                <Grid>
                                    <TextField
                                        label="Price"
                                        name="price"
                                        type="number"
                                        value={productData.price}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    /></Grid>
                            </Grid>
                            <FormControl fullWidth required>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category"
                                    value={productData.category}
                                    onChange={handleChange}
                                >
                                    {categories.map((ele,index) => (
                                        <MenuItem value={ele}>{ele.name}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                            <TextField
                                label="Description"
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                            />
                            <Button
                                variant="contained"
                                component="label"
                                color="secondary"
                                fullWidth
                                style={{ marginTop: '1rem', textTransform: 'none' }}
                            >
                                Upload Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleFileChange}
                                    required
                                />
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: '1.5rem', fontWeight: 'bold' }}
                            >
                                Add Product
                            </Button>
                        </StyledForm>
                    </CardContent>
                </CardContainer>
                <Button onClick={()=>{navigate('/UserProfile')}} >Back</Button>
            </Grid>
            
        </Container>
    );
}
