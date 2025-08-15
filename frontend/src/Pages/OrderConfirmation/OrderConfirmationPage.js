// src/Pages/OrderConfirmation/OrderConfirmationPage.js
import React from 'react';
import OrderConfirmation from '../../Components/OrderConfirmation/OrderConfirmation';
import Footer from '../../Components/Footer/Footer';

function OrderConfirmationPage() {
  return (
    <div className="order-confirmation-page">
      <OrderConfirmation />
      <Footer />
    </div>
  );
}

export default OrderConfirmationPage;