// src/Components/Categories/Categories.js
import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import ProductCard from '../ProductCard/ProductCard';
import './Categories.css';

function Categories() {
  const { addToCart } = useCart();
  const [groupedProducts, setGroupedProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Categories;