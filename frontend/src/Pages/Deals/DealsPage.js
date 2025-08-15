// src/Pages/Deals/DealsPage.js
import React from 'react';
import Deals from '../../Components/Deals/Deals';
import Footer from '../../Components/Footer/Footer';

function DealsPage() {
  return (
    <div className="deals-page">
      <Deals />
      <Footer />
    </div>
  );
}

export default DealsPage;