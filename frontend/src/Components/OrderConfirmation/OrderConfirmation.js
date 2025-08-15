// src/Components/OrderConfirmation/OrderConfirmation.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

function OrderConfirmation() {
  const navigate = useNavigate();

  // Redirect to homepage after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="order-confirmation">
      <div className="confirmation-icon">
        <i className="bi bi-check-circle-fill"></i>
      </div>
      <h2>Order Placed Successfully!</h2>
      <p>
        Thank you for your purchase. Your order has been received. You will be redirected to the homepage shortly…
      </p>
      <Link to="/" className="btn btn-primary">
        Continue Shopping
      </Link>
    </section>
  );
}

export default OrderConfirmation;