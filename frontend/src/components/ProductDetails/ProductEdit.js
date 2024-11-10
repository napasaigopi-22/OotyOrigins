import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';

const EditProductForm = ({ product, onSubmit }) => {
  const [categories, setCategories] = useState([]);
    console.log(product.category);
  const [formValues, setFormValues] = useState({
    name: product.name || '',
    productId: product.productId || '',
    description: product.description || '',
    price: product.price || 0,
    category: product.category || '',
    images: product.images || [''],
    stock: product.stock || 0,
    rating: product.rating || 0,
  });

  useEffect(() => {
    axios.get('http://localhost:4000/get/categories')
      .then(res => {
        setCategories(res.data);
        console.log("categories", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formValues.images];
    updatedImages[index] = value;
    setFormValues({ ...formValues, images: updatedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues); // Pass updated values to the parent component
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              name="name"
              fullWidth
              value={formValues.name}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              value={formValues.description}
              onChange={handleChange}
            />
          </Grid>

          {/* Price */}
          <Grid item xs={6}>
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              value={formValues.price}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Category */}
          <Grid item xs={6}>
            <Select
              label="Category"
              name="category"
              fullWidth
              value={formValues.category}
              onChange={handleChange}
              required
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* Images */}
          {formValues.images.map((image, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                label={`Image URL ${index + 1}`}
                value={image}
                fullWidth
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
            </Grid>
          ))}

          {/* Stock */}
          <Grid item xs={6}>
            <TextField
              label="Stock"
              name="stock"
              type="number"
              fullWidth
              value={formValues.stock}
              onChange={handleChange}
            />
          </Grid>

          {/* Rating */}
          <Grid item xs={6}>
            <TextField
              label="Rating"
              name="rating"
              type="number"
              fullWidth
              value={formValues.rating}
              onChange={handleChange}
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              required
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditProductForm;
