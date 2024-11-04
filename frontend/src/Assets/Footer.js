import React from 'react';
import "./Footer.css";
import insta from '../Assets/images/instagram.png';
import twitter from '../Assets/images/twitter.png';
import meta from '../Assets/images/meta.png';
import google from '../Assets/images/google.png';
import Asserts from '../Assets/Asserts';
import { Box, Typography } from '@mui/material';

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
                <li><a href="/BacktoTop">Back to Top</a></li>
                <li><a href="/products">Products</a></li>
              </ul>
            </div>

            <div className="footer-section social">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <img src={Asserts.meta} alt="Meta" className="social-icon" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <img src={twitter} alt="Twitter" className="social-icon" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <img src={insta} alt="Instagram" className="social-icon" />
                </a>
                <a href="https://www.google.com/" target="_blank" rel="noreferrer">
                  <img src={google} alt="Google" className="social-icon" />
                </a>
              </div>
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
