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

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
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
          <span className="product-price">${product.price.toFixed(2)}</span>
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