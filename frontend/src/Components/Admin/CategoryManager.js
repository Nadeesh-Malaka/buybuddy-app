// src/Components/Admin/CategoryManager.js
import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';
import CategoryForm from './CategoryForm';
import './CategoryManager.css';

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError('Failed to load categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category? This will affect all associated products.')) {
      try {
        await categoryService.deleteCategory(id);
        setCategories(categories.filter(c => c.id !== id));
      } catch (err) {
        alert('Failed to delete category. It may have associated products.');
        console.error('Error deleting category:', err);
      }
    }
  };

  const handleFormSubmit = async (categoryData) => {
    try {
      if (editingCategory) {
        const updatedCategory = await categoryService.updateCategory(editingCategory.id, categoryData);
        setCategories(categories.map(c => c.id === editingCategory.id ? updatedCategory : c));
      } else {
        const newCategory = await categoryService.createCategory(categoryData);
        setCategories([...categories, newCategory]);
      }
      setShowForm(false);
      setEditingCategory(null);
    } catch (err) {
      alert('Failed to save category. Category name might already exist.');
      console.error('Error saving category:', err);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  if (loading) return <div className="loading">Loading categories...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-manager">
      {showForm ? (
        <CategoryForm
          category={editingCategory}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      ) : (
        <>
          <div className="manager-header">
            <h2>Category Management</h2>
            <button className="btn-primary" onClick={handleCreateCategory}>
              Add New Category
            </button>
          </div>

          <div className="categories-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.description || 'No description'}</td>
                    <td>
                      <button 
                        className="btn-edit"
                        onClick={() => handleEditCategory(category)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {categories.length === 0 && (
              <div className="no-data">
                No categories found. Create your first category to get started.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryManager;
