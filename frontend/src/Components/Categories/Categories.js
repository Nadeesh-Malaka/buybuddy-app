// src/Components/Categories/Categories.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import ProductCard from '../ProductCard/ProductCard';
import './Categories.css';

function Categories() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [groupedProducts, setGroupedProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productService.getAllProducts(),
        categoryService.getAllCategories()
      ]);

      // Group products by category
      const grouped = productsData.reduce((acc, product) => {
        const categoryName = product.category;
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(product);
        return acc;
      }, {});

      setGroupedProducts(grouped);
      setCategories(Object.keys(grouped));
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load products and categories');
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

  if (loading) {
    return (
      <section className="categories">
        <div className="categories-header">
          <h2>Product Categories</h2>
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="categories">
        <div className="categories-header">
          <h2>Product Categories</h2>
          <p className="error">{error}</p>
          <button onClick={fetchData}>Retry</button>
        </div>
      </section>
    );
  }

  return (
    <section className="categories">
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
      
      <div className="categories-header">
        <h2>Product Categories</h2>
        <p>Browse our products by category</p>
      </div>
      {categories.map(category => (
        <div key={category} className="category-section">
          <h3>{category}</h3>
          <div className="category-products">
            {groupedProducts[category].map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Categories;