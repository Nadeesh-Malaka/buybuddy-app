// src/Components/Admin/CategoryForm.js
import React, { useState, useEffect } from 'react';
import './CategoryForm.css';

function CategoryForm({ category, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || ''
      });
    }
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-form">
      <div className="form-header">
        <h2>{category ? 'Edit Category' : 'Add New Category'}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter category name"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            placeholder="Enter category description (optional)"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : (category ? 'Update Category' : 'Create Category')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;
