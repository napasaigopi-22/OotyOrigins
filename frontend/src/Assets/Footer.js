import React from 'react';
import "./Footer.css";
import { IconButton, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ width: '100%', padding: '10px' }}>
      <footer className="footer">
      <div className="footer-container">
        <div className="footer-top-strip">
          <h4>OOTY, TAMILNADU</h4>
        </div>

        <div className="footer-middle">
          <div className="footer-container">
            <div className="footer-section about">
              <h2>Ooty Origins</h2>
              <p>
                Empowering tribal communities of Ooty by offering their unique handmade products.
                Explore our range of authentic and culturally rich items.
              </p>
            </div>

            <div className="footer-section links">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="/BacktoTop">Intro Page</a></li>
                <li><a href="/products">Products</a></li>
              </ul>
            </div>

            <div className="footer-section social">
              <h3>Follow Us</h3>

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
            </div>

            <div className='footer-section contact'>
              <h3>Contact Us</h3>
              <p>+91 9999999999</p>
              <p>ootyorigins@gmail.com</p>
            </div>
            </div>
        </div>

        <div className="footer-bottom-strip">
          <p>&copy; 2024 Ooty Origins</p>
        </div>

        </div>
      </footer>
    </Box>
  );
};

export default Footer;
