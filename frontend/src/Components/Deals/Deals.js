// src/Components/Deals/Deals.js
import React from 'react';
import { useCart } from '../../context/CartContext';
import { mockProducts } from '../../data/products';
import DealsProductCard from '../DealsProductCard/DealsProductCard';
import './Deals.css';

function Deals() {
  const { addToCart } = useCart();

  // Calculate max discount for the stats section
  const maxDiscount = Math.max(...mockProducts.map(p => p.discountPercentage || 0));

  // Prepare products with discount data
  const dealsProducts = mockProducts.map(product => {
    const originalPrice = product.originalPrice;
    const discountPercentage = product.discountPercentage || 0;
    const discountAmount = (discountPercentage / 100) * originalPrice;
    const discountedPrice = originalPrice - discountAmount;
    const savings = discountAmount;

    return {
      ...product,
      originalPrice,
      discountedPrice,
      discountPercentage,
      savings,
    };
  });

  return (
    <section className="deals">
      <div className="deals-header">
        <h2>Special Deals & Offers</h2>
        <p>Limited time offers on selected products</p>
        <div className="deals-stats">
          <div className="stat">
            <span>{maxDiscount}%</span>
            <p>Max Discount</p>
          </div>
          <div className="stat">
            <span>48h</span>
            <p>Limited Time</p>
          </div>
          <div className="stat">
            <span>100+</span>
            <p>Products</p>
          </div>
        </div>
      </div>
      <div className="deals-products">
        {dealsProducts.map(product => (
          <DealsProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default Deals;