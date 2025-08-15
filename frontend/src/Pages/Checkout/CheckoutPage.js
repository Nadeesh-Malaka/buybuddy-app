// src/Pages/Checkout/CheckoutPage.js
import React from 'react';
import Checkout from '../../Components/Checkout/Checkout';
import Footer from '../../Components/Footer/Footer';

function CheckoutPage() {
  return (
    <div className="checkout-page">
      <Checkout />
      <Footer />
    </div>
  );
}

export default CheckoutPage;