// src/Components/WhyShop/WhyShop.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // For Bootstrap Icons
import './WhyShop.css';

function WhyShop() {
  return (
    <section className="why-shop">
      <h2 className="why-shop-title">Why Shop With Us?</h2>
      <div className="why-shop-container">
        <div className="why-shop-item">
          <div className="why-shop-icon">
            <i className="bi bi-truck"></i>
          </div>
          <h5>Fast Delivery</h5>
          <p>Get your products delivered within 2-3 business days.</p>
        </div>
        <div className="why-shop-item">
          <div className="why-shop-icon">
            <i className="bi bi-shield-lock"></i>
          </div>
          <h5>Secure Payments</h5>
          <p>Your payment information is always protected.</p>
        </div>
        <div className="why-shop-item">
          <div className="why-shop-icon">
            <i className="bi bi-award"></i>
          </div>
          <h5>Quality Products</h5>
          <p>We ensure all our products meet high quality standards.</p>
        </div>
      </div>
    </section>
  );
}

export default WhyShop;