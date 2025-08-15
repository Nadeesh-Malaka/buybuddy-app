// src/Components/Checkout/Checkout.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import { useCart } from '../../context/CartContext';
import './Checkout.css';

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate(); // Add navigate hook

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 10.00;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.cardNumber) {
      alert('Please fill in all required fields.');
      return;
    }
    clearCart();
    navigate('/order-confirmation'); // Redirect to order confirmation
  };

  return (
    <section className="checkout">
      <div className="checkout-header">
        <Link to="/cart" className="back-to-cart">
          <i className="bi bi-arrow-left"></i> Back to Cart
        </Link>
        <h2>Checkout</h2>
      </div>
      <div className="checkout-body">
        <div className="checkout-form">
          <h5>Shipping Information</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="zip">ZIP Code</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <h5>Payment Information</h5>
            <div className="form-group">
              <label htmlFor="nameOnCard">Name on Card</label>
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiry">Expiration Date</label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </form>
        </div>

        <div className="checkout-summary">
          <h5>Order Summary</h5>
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
}

export default Checkout;