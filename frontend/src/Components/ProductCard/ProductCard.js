// src/Components/ProductCard/ProductCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductCard.css';

function ProductCard({ product, addToCart }) {
  const [isAdded, setIsAdded] = useState(false); // Track if item was added to cart

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

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true); // Show success message
    setTimeout(() => setIsAdded(false), 1000); // Hide after 1 second
  };

  // Handle image URL - if it starts with /uploads, add backend server URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.png'; // Fallback image
    if (imageUrl.startsWith('/uploads')) {
      return `http://localhost:8080${imageUrl}`;
    }
    if (imageUrl.startsWith('http')) {
      return imageUrl; // Already a full URL
    }
    // For local images (legacy support)
    try {
      return require(`../../assets/${imageUrl.split('/').pop()}`);
    } catch (err) {
      return '/placeholder-image.png';
    }
  };

  return (
    <div className="product-card">
      <img src={getImageUrl(product.image)} alt={product.name} className="product-image" />
      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-name">
          <h5>{product.name}</h5>
        </Link>
        <div className="product-rating">
          {renderStars(product.rating)}
          <span>({product.rating})</span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-add-to-cart">
          <span className="product-price">${product.price}</span>
          <div className="add-to-cart-wrapper">
            <button onClick={handleAddToCart}>
              <i className="bi bi-cart-plus"></i>
            </button>
            {isAdded && <span className="success-message">Added!</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;