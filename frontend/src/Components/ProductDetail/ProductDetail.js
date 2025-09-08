// src/Components/ProductDetail/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/productService';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const productData = await productService.getProductById(id);
      setProduct(productData);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

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
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1000);
    }
  };

  // Construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/api/placeholder/500/500';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8080${imagePath}`;
  };

  if (loading) {
    return (
      <section className="product-detail">
        <div className="product-detail-header">
          <Link to="/" className="back-to-products">
            <i className="bi bi-arrow-left"></i> Back to Products
          </Link>
        </div>
        <div className="product-detail-body">
          <div className="loading-container">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading product details...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="product-detail">
        <div className="product-detail-header">
          <Link to="/" className="back-to-products">
            <i className="bi bi-arrow-left"></i> Back to Products
          </Link>
        </div>
        <div className="product-detail-body">
          <div className="error-container">
            <h3>{error || 'Product not found'}</h3>
            <p>The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="btn btn-primary">Browse All Products</Link>
          </div>
        </div>
      </section>
    );
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
          <img src={getImageUrl(product.image || product.imageUrl)} alt={product.name} />
        </div>
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h2>{product.name}</h2>
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`bi ${i < Math.floor(product.rating || 0) ? 'bi-star-fill' : 'bi-star'}`}
                style={{ color: i < Math.floor(product.rating || 0) ? '#f5c518' : '#d1d5db' }}
              />
            ))}
            <span>({product.rating || 0} reviews)</span>
          </div>
          <h3>${(product.price || 0).toFixed(2)}</h3>
          <p>{product.description}</p>
          <div className="product-quantity">
            <span>Quantity</span>
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
          </div>
          <p className="stock-status">{product.stock || 0} in stock</p>
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