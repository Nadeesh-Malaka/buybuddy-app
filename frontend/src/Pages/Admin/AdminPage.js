// src/Pages/Admin/AdminPage.js
import React, { useState } from 'react';
import ProductManager from '../../Components/Admin/ProductManager';
import CategoryManager from '../../Components/Admin/CategoryManager';
import './AdminPage.css';

function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage products and categories</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          className={`tab-button ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'categories' && <CategoryManager />}
      </div>
    </div>
  );
}

export default AdminPage;
