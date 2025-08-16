// src/Pages/Home/Home.js
import React, { useState, useEffect, useCallback } from 'react';
import Headers from '../../Components/Header/Header';
import ProductCard from '../../Components/ProductCard/ProductCard';
import WhyShop from '../../Components/WhyShop/WhyShop';
import Footer from '../../Components/Footer/Footer';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { useCart } from '../../context/CartContext';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchData();
  }, []);

  const filterAndSortProducts = useCallback(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'Price: Low to High':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'Featured':
      default:
        // Keep original order or sort by some featured logic
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy]);

  useEffect(() => {
    filterAndSortProducts();
  }, [filterAndSortProducts]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productService.getAllProducts(),
        categoryService.getAllCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="home">
        <Headers />
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <Headers />
        <div className="container py-5">
          <div className="alert alert-danger" role="alert">
            {error}
            <button 
              className="btn btn-link" 
              onClick={fetchData}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <Headers />
      <div className="products-section" id='products'>
        <div className="products-header">
          <h4>Products ({filteredProducts.length})</h4>
          <div className="products-controls">
            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {selectedCategory}
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => setSelectedCategory('All')}>All</button></li>
                {categories.map(category => (
                  <li key={category.id}>
                    <button 
                      className="dropdown-item" 
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown ms-2">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Sort by: {sortBy}
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => setSortBy('Featured')}>Featured</button></li>
                <li><button className="dropdown-item" onClick={() => setSortBy('Price: Low to High')}>Price: Low to High</button></li>
                <li><button className="dropdown-item" onClick={() => setSortBy('Price: High to Low')}>Price: High to Low</button></li>
                <li><button className="dropdown-item" onClick={() => setSortBy('Rating')}>Rating</button></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <div className="col-12 text-center">
              <p className="text-muted">No products found for the selected category.</p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))
          )}
        </div>
      </div>
      <WhyShop />
      <Footer />
    </div>
  );
}

export default Home;