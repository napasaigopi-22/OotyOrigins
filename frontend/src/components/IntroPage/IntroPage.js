import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './IntroPage.css'; // Create this CSS file for styling

function IntroPage() {
    const navigate = useNavigate();

    const handleImageClick = () => {
        navigate('/home');
    };

    return (
        <Box className="intro-container">
            <Box className="overlay">
            <Typography 
                    variant="h2" 
                    color="green" 
                    fontFamily="Poppins, sans-serif" 
                    fontWeight={700} 
                    className="intro-text"
                    sx={{ textAlign: 'center', marginTop: '30px' }}
                >
                    Ooty Origins
                </Typography>

                <Typography 
                    color="white" 
                    className="sub-heading"
                    sx={{ textAlign: 'center', marginBottom: '20px' }}
                >
                    Launching Soon
                </Typography>

                <Typography 
                    variant="h1" 
                    color="gold" 
                    className="main-text" 
                    sx={{ textAlign: 'center', marginBottom: '30px' }}
                >
                    Everything You Love in One Place
                </Typography>

                <Typography 
                    variant="h5" 
                    color="white" 
                    className="normal-text" 
                    sx={{ textAlign: 'center', marginBottom: '40px' }}
                >
                    Click below to Experience the Ultimate Shopping World of Tribal Handicrafts by Ooty Origins
                </Typography>

                <Button 
                    variant="contained" 
                    background-color= '#FFD700'
                    className="enter-button" 
                    onClick={handleImageClick} 
                    sx={{ padding: '10px 30px', fontSize: '18px', borderRadius: '25px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}
                >
                    Home Page
                </Button>

                <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'center' }}>
                    <IconButton href="https://www.facebook.com" target="_blank" sx={{ color: '#fff', '&:hover': { color: '#3b5998' } }}>
                        <Facebook />
                    </IconButton>
                    <IconButton href="https://www.twitter.com" target="_blank" sx={{ color: '#fff', '&:hover': { color: '#00acee' } }}>
                        <Twitter />
                    </IconButton>
                    <IconButton href="https://www.instagram.com" target="_blank" sx={{ color: '#fff', '&:hover': { color: '#e4405f' } }}>
                        <Instagram />
                    </IconButton>
                    <IconButton href="https://www.linkedin.com" target="_blank" sx={{ color: '#fff', '&:hover': { color: '#0077b5' } }}>
                        <LinkedIn />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}

export default IntroPage;
