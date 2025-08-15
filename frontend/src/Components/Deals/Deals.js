// src/Components/Deals/Deals.js
import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/productService';
import DealsProductCard from '../DealsProductCard/DealsProductCard';
import './Deals.css';

function Deals() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDealsProducts();
  }, []);

  const fetchDealsProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProductsOnSale();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching deals:', err);
      setError('Failed to load deals');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="deals">
        <div className="deals-header">
          <h2>Special Deals & Offers</h2>
          <p>Loading deals...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="deals">
        <div className="deals-header">
          <h2>Special Deals & Offers</h2>
          <p className="error">{error}</p>
          <button onClick={fetchDealsProducts}>Retry</button>
        </div>
      </section>
    );
  }

  // Calculate max discount for the stats section
  const maxDiscount = products.length > 0 ? Math.max(...products.map(p => p.discountPercentage || 0)) : 0;

  // Prepare products with discount data
  const dealsProducts = products.map(product => {
    const originalPrice = product.originalPrice || product.price;
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
        {products.length > 0 && (
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
              <span>{products.length}</span>
              <p>Products</p>
            </div>
          </div>
        )}
      </div>
      <div className="deals-products">
        {dealsProducts.length > 0 ? (
          dealsProducts.map(product => (
            <DealsProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <div className="no-deals">
            <p>No deals available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Deals;