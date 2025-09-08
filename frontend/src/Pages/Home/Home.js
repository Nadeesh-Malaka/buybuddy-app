// src/Pages/Home/Home.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setShowCategoryDropdown(false);
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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

  const handleAddToCart = async (product) => {
    try {
      const result = await addToCart(product);
      if (result && result.requiresLogin) {
        // Show user-friendly alert
        setShowLoginAlert(true);
        // Auto redirect after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else if (result && result.success) {
        // Optional: Show success message
        console.log('Item added to cart successfully');
      } else if (result && result.error) {
        // Show error message
        console.error('Error adding to cart:', result.error);
      }
    } catch (error) {
      console.error('Error in handleAddToCart:', error);
    }
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowCategoryDropdown(false);
  };

  const handleSortSelect = (sortOption) => {
    setSortBy(sortOption);
    setShowSortDropdown(false);
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
      
      {/* Login Alert */}
      {showLoginAlert && (
        <div className="alert alert-warning alert-dismissible fade show position-fixed" 
             style={{top: '20px', right: '20px', zIndex: 9999, minWidth: '300px'}}>
          <strong>Login Required!</strong>
          <p className="mb-2">You need to log in to add items to your cart.</p>
          <p className="mb-2">Redirecting to login page in 3 seconds...</p>
          <button 
            type="button" 
            className="btn btn-sm btn-primary me-2"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setShowLoginAlert(false)}
          ></button>
        </div>
      )}
      
      <div className="products-section" id='products'>
        <div className="products-header">
          <h4>Products ({filteredProducts.length})</h4>
          <div className="products-controls">
            <div className="dropdown">
              <button 
                className="btn btn-outline-secondary dropdown-toggle" 
                type="button" 
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                {selectedCategory} <i className="bi bi-chevron-down"></i>
              </button>
              {showCategoryDropdown && (
                <ul className="dropdown-menu show">
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleCategorySelect('All')}
                    >
                      All
                    </button>
                  </li>
                  {categories.map(category => (
                    <li key={category.id}>
                      <button 
                        className="dropdown-item" 
                        onClick={() => handleCategorySelect(category.name)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="dropdown ms-2">
              <button 
                className="btn btn-outline-secondary dropdown-toggle" 
                type="button" 
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                Sort by: {sortBy} <i className="bi bi-chevron-down"></i>
              </button>
              {showSortDropdown && (
                <ul className="dropdown-menu show">
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleSortSelect('Featured')}
                    >
                      Featured
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleSortSelect('Price: Low to High')}
                    >
                      Price: Low to High
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleSortSelect('Price: High to Low')}
                    >
                      Price: High to Low
                    </button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleSortSelect('Rating')}
                    >
                      Rating
                    </button>
                  </li>
                </ul>
              )}
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