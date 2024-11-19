import React from 'react';
import { Box, Typography } from '@mui/material';

export default function CartProduct({ name, price, quantity }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: '#f5f5f5',
        background: 'linear-gradient(135deg, #2a2d39, #1c1e26)',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '10px',
        color: '#333',
        '&:hover': {
          transform: 'none',
        }
      }}
    >
      {/* Product Name */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: '500',
          flex: '2',
          color: '#1976d2',
          
        }}
      >
        {name}
      </Typography>

      {/* Price per Unit */}
      <Typography
        variant="body1"
        sx={{
          flex: '1',
          textAlign: 'center',
          color: '#4caf50',
        }}
      >
        ₹{price.toFixed(2)}
      </Typography>

      {/* Quantity */}
      <Typography
        variant="body1"
        sx={{
          flex: '1',
          textAlign: 'center',
          color: '#f57c00',
        }}
      >
        x {quantity}
      </Typography>

      {/* Total Price */}
      <Typography
        variant="body1"
        sx={{
          flex: '1',
          textAlign: 'center',
          fontWeight: '600',
          color: '#d32f2f',
        }}
      >
        ₹{(price * quantity).toFixed(2)}
      </Typography>
    </Box>
  );
}
