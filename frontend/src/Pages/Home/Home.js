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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  if (error) {
    return (
      <div className="home">
        <Headers />
        <div className="products-section" id='products'>
          <div className="products-header">
            <h4>Products</h4>
            <p className="error-message">{error}</p>
            <button onClick={fetchData} className="retry-button">Retry</button>
          </div>
        </div>
        <WhyShop />
        <Footer />
      </div>
    );
  }

  return (
    <div className="home">
      <Headers />
      <div className="products-section" id='products'>
        <div className="products-header">
          <h4>Products</h4>
          <div className="products-controls">
            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {selectedCategory}
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => handleCategoryChange('All')}>All</button></li>
                {categories.map(category => (
                  <li key={category.id}>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleCategoryChange(category.name)}
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
                <li><button className="dropdown-item" onClick={() => handleSortChange('Featured')}>Featured</button></li>
                <li><button className="dropdown-item" onClick={() => handleSortChange('Price: Low to High')}>Price: Low to High</button></li>
                <li><button className="dropdown-item" onClick={() => handleSortChange('Price: High to Low')}>Price: High to Low</button></li>
                <li><button className="dropdown-item" onClick={() => handleSortChange('Rating')}>Rating</button></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="products-grid">
          {loading ? (
            <div className="loading-message">Loading products...</div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))
          ) : (
            <div className="no-products-message">No products found.</div>
          )}
        </div>
      </div>
      <WhyShop />
      <Footer />
    </div>
  );
}

export default Home;