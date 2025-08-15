// src/Components/Footer/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: BuyBuddy */}
        <div className="footer-section">
          <h5>BuyBuddy</h5>
          <p>Your one-stop shop for all your needs.</p>
        </div>

        {/* Column 2: Shop */}
        <div className="footer-section">
          <h5>Shop</h5>
          <ul>
            <li><a href="#">All Products</a></li>
            <li><a href="#">Deals</a></li>
            <li><a href="#">New Arrivals</a></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div className="footer-section">
          <h5>Support</h5>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Shipping</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-section">
          <h5>Newsletter</h5>
          <p>Subscribe to get special offers and updates.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" aria-label="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 BuyBuddy. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;