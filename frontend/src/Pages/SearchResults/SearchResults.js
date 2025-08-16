// src/Pages/SearchResults/SearchResults.js
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../Components/ProductCard/ProductCard';
import './SearchResults.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (query.trim()) {
      searchProducts(query);
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  const searchProducts = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      const results = await productService.searchProducts(searchQuery);
      setProducts(results);
    } catch (err) {
      console.error('Error searching products:', err);
      setError('Failed to search products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleNewSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newQuery = formData.get('search');
    if (newQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(newQuery)}`);
    }
  };

  if (loading) {
    return (
      <div className="search-results">
        <div className="container">
          <div className="search-header">
            <h2>Searching for "{query}"...</h2>
          </div>
          <div className="loading-container">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Searching products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results">
        <div className="container">
          <div className="search-header">
            <h2>Search Results</h2>
            <form className="search-form" onSubmit={handleNewSearch}>
              <input
                type="search"
                name="search"
                placeholder="Search products..."
                defaultValue={query}
                className="form-control"
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          </div>
          <div className="error-container">
            <div className="alert alert-danger" role="alert">
              {error}
              <button 
                className="btn btn-link" 
                onClick={() => searchProducts(query)}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="container">
        <div className="search-header">
          <h2>
            {products.length === 0 ? 'No results found' : `${products.length} results`} 
            {query && ` for "${query}"`}
          </h2>
          <form className="search-form" onSubmit={handleNewSearch}>
            <input
              type="search"
              name="search"
              placeholder="Search products..."
              defaultValue={query}
              className="form-control"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>

        {products.length === 0 ? (
          <div className="no-results">
            <div className="no-results-content">
              <i className="bi bi-search" style={{ fontSize: '4rem', color: '#ccc' }}></i>
              <h3>No products found</h3>
              <p>Try searching with different keywords or browse our categories.</p>
              <div className="suggestions">
                <button 
                  className="btn btn-outline-primary me-2" 
                  onClick={() => navigate('/categories')}
                >
                  Browse Categories
                </button>
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={() => navigate('/deals')}
                >
                  View Deals
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="search-results-grid">
            {products.map(product => (
              <ProductCard 
                key={product.id}
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
