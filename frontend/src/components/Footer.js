// components/Footer.js
import React from 'react';
import './Footer.css'; // Ensure you create or update Footer styles
import insta from  '../Assets/images/instagram.png';
import twitter from '../Assets/images/twitter.png';
import meta from  '../Assets/images/meta.png';
import google from '../Assets/images/google.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

    <div className="footer-top-strip">
    <div className="footer-content">
    </div>
    <h4>OOTY,TAMILNADU</h4>
    </div>

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
            <li><a href="/about">About Us</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/cart">Your Cart</a></li>
            
          </ul>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img src={meta} alt="meta" className="social-icons" />
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <img src={twitter} alt="Twitter" className="social-icons" />
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
              <img src={insta} alt="Instagram" className="social-icons" />
            </a>
            <a href="https://www.google.com/" target="_blank" rel="noreferrer">
              <i className="fab fa-google"></i>
              <img src={google} alt="Google" className="social-icons" />
            </a>
          </div>
        </div>
      </div>


      <div className='footer-section contact'>
        <h3>Contact Us</h3>
        <p>+91 9999999999</p>
        <p>ootyorigins@gmail.com</p>
      </div>

      <div className="footer-bottom-strip">
    <div className="footer-content">
    </div>
        <p>&copy; 2024 Ooty Origins</p>
      </div>
    </footer>
  );
};

export default Footer;
