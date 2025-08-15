// src/Components/Categories/Categories.js
import React from 'react';
import { useCart } from '../../context/CartContext';
import { mockProducts } from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';
import './Categories.css';

function Categories() {
  const { addToCart } = useCart();

  // Group products by category
  const groupedProducts = mockProducts.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  // Get the list of categories
  const categories = Object.keys(groupedProducts);

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