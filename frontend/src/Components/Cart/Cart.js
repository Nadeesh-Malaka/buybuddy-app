// src/Components/Cart/Cart.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import './Cart.css';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isLoggedIn } = useUser();
  const navigate = useNavigate(); // Add navigate hook

  // If user is not logged in, show login prompt
  if (!isLoggedIn) {
    return (
      <section className="cart">
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <i className="bi bi-person-lock"></i>
          </div>
          <h2>Please log in to view your cart</h2>
          <p>You need to be logged in to add and view items in your cart.</p>
          <Link to="/login" className="btn btn-primary">Log In</Link>
        </div>
      </section>
    );
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 10.00;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  const freeShippingThreshold = 500;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  // Construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/api/placeholder/250/250';
    if (imagePath.startsWith('http')) return imagePath;
    // Backend returns the full path including /uploads/
    return `http://localhost:8080${imagePath}`;
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <section className="cart">
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <i className="bi bi-cart"></i>
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven’t added any products to your cart yet.</p>
          <Link to="/" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-header">
            <h2>Shopping Cart ({cartItems.length} items)</h2>
            <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
          </div>
          <div className="cart-body">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={getImageUrl(item.image || item.imageUrl)} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h5>{item.name}</h5>
                    <p className="cart-item-category">Accessories</p>
                    <div className="cart-item-quantity">
                      <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                    </div>
                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
                      <i className="bi bi-trash"></i> Remove
                    </button>
                  </div>
                  <div className="cart-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              <Link to="/" className="continue-shopping">
                <i className="bi bi-arrow-left"></i> Continue Shopping
              </Link>
            </div>
            <div className="cart-summary">
              <h5>Order Summary</h5>
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
              <button
                className="btn btn-primary w-100"
                onClick={() => navigate('/checkout')} // Redirect to checkout
              >
                Proceed to Checkout
              </button>
              {remainingForFreeShipping > 0 && (
                <p className="free-shipping-message">
                  Add ${remainingForFreeShipping.toFixed(2)} more to get free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;