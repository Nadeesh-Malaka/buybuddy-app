// src/Components/DealsProductCard/DealsProductCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DealsProductCard.css';

function DealsProductCard({ product, addToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill"></i>);
    }
    if (hasHalfStar && stars.length < 5) {
      stars.push(<i key="half" className="bi bi-star-half"></i>);
    }
    while (stars.length < 5) {
      stars.push(<i key={`empty-${stars.length}`} className="bi bi-star"></i>);
    }
    return stars;
  };

  const handleAddToCart = async () => {
    try {
      // Use the addToCart function passed from parent component
      if (addToCart) {
        await addToCart({ ...product, price: product.originalPrice }); // Use original price
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1000);
      }
    } catch (error) {
      console.error('Error in handleAddToCart:', error);
    }
  };

  // Construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/api/placeholder/250/250';
    if (imagePath.startsWith('http')) return imagePath;
    // Backend returns the full path including /uploads/
    return `http://localhost:8080${imagePath}`;
  };

  // Use the discount data passed from the Deals component
  const { originalPrice, discountedPrice, discountPercentage, savings } = product;
  const hasDiscount = discountPercentage && discountPercentage > 0;

  return (
    <div className="deals-product-card">
      {hasDiscount && (
        <span className="discount-badge">{discountPercentage}% OFF</span>
      )}
      <img src={getImageUrl(product.image || product.imageUrl)} alt={product.name} className="product-image" />
      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-name">
          <h5>{product.name}</h5>
        </Link>
        <div className="product-rating">
          {renderStars(product.rating || 0)}
          <span>({product.rating || 0})</span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-add-to-cart">
          <div className="price-section">
            {hasDiscount ? (
              <>
                <span className="product-price discounted">${(discountedPrice || 0).toFixed(2)}</span>
                <span className="original-price">${(originalPrice || 0).toFixed(2)}</span>
                <span className="savings">Save ${(savings || 0).toFixed(2)}</span>
              </>
            ) : (
              <span className="product-price">${(originalPrice || product.price || 0).toFixed(2)}</span>
            )}
          </div>
          <div className="add-to-cart-wrapper">
            <button onClick={handleAddToCart}>
              <i className="bi bi-cart-plus"></i>
            </button>
            {isAdded && <span className="success-message">Added to Cart!</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealsProductCard;