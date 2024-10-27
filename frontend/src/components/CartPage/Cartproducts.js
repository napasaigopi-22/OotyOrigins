import React from 'react';
import { Box, Typography } from '@mui/material';

export default function CartProduct({ name, price, quantity }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, #2a2d39, #1c1e26)',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
        marginBottom: '10px',
        color: '#e0e0e0',
      }}
    >
      {/* Product Name */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          flex: '2',
          color: '#00e6ff',
          textShadow: '0 0 5px rgba(0, 230, 255, 0.6)',
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
          color: '#fdd835',
          textShadow: '0 0 5px rgba(253, 216, 53, 0.7)',
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
          color: '#fbc02d',
          textShadow: '0 0 5px rgba(251, 192, 45, 0.7)',
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
          fontWeight: 'bold',
          color: '#ff4081',
          textShadow: '0 0 5px rgba(255, 64, 129, 0.7)',
        }}
      >
        ₹{(price * quantity).toFixed(2)}
      </Typography>
    </Box>
  );
}
