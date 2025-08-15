// src/Components/ProductDetail/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { mockProducts } from '../../data/products';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false); // Track if item was added to cart

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setProduct(null);
    }
  }, [id]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 25)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const productToAdd = { ...product, quantity };
      addToCart(productToAdd);
      setIsAdded(true); // Show success message
      setTimeout(() => setIsAdded(false), 1000); // Hide after 1 second
    }
  };

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <section className="product-detail">
      <div className="product-detail-header">
        <Link to="/" className="back-to-products">
          <i className="bi bi-arrow-left"></i> Back to Products
        </Link>
      </div>
      <div className="product-detail-body">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h2>{product.name}</h2>
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`bi ${i < Math.floor(product.rating) ? 'bi-star-fill' : 'bi-star'}`}
                style={{ color: i < Math.floor(product.rating) ? '#f5c518' : '#d1d5db' }}
              />
            ))}
            <span>({product.reviews} reviews)</span>
          </div>
          <h3>${product.price.toFixed(2)}</h3>
          <p>{product.description}</p>
          <div className="product-quantity">
            <span>Quantity</span>
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
          </div>
          <p className="stock-status">{product.stock} in stock</p>
          <div className="product-actions">
            <div className="add-to-cart-wrapper">
              <button className="btn btn-primary" onClick={handleAddToCart}>
                <i className="bi bi-cart"></i> Add to Cart
              </button>
              {isAdded && <span className="success-message">Added to Cart</span>}
            </div>
            <Link to="/cart" className="btn btn-outline-primary">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;