import React, { useState } from 'react';
import { TextField, Button, Typography, Box, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import axios from 'axios';

export default function AddProduct() {
    const [productData, setProductData] = useState({
        productName: '',
        stock: '',
        price: '',
        category: '',
        description: '',
        image: null,
      });
    
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
        formData.append('uploadedBy',localStorage.getItem("userId"));
        
    
        try {
            console.log(formData);
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Typography variant="h5" gutterBottom>
            Add New Product
          </Typography>
          <TextField
            label="Product Name"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={productData.stock}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="price"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
            >
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Clothing">Clothing</MenuItem>
              <MenuItem value="Accessories">Accessories</MenuItem>
              {/* Add more categories as needed */}
            </Select>
          </FormControl>
          <TextField
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <input
            accept="image/*"
            type="file"
            onChange={e=>setProductData({ ...productData, image: e.target.files[0] })}
            required
            style={{ marginTop: '16px', marginBottom: '16px' }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Product
          </Button>
        </form>
      );
}
