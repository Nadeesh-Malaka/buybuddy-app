// src/services/categoryService.js
import { API_ENDPOINTS } from './apiConfig';

export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CATEGORIES_ALL);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get category by ID
  getCategoryById: async (id) => {
    try {
      const response = await fetch(API_ENDPOINTS.CATEGORY_BY_ID(id));
      if (!response.ok) {
        throw new Error('Failed to fetch category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },

  // Get category by name
  getCategoryByName: async (name) => {
    try {
      const response = await fetch(API_ENDPOINTS.CATEGORY_BY_NAME(name));
      if (!response.ok) {
        throw new Error('Failed to fetch category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching category by name:', error);
      throw error;
    }
  },

  // Create category
  createCategory: async (categoryData) => {
    try {
      const response = await fetch(API_ENDPOINTS.CATEGORY_CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) {
        throw new Error('Failed to create category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  // Update category
  updateCategory: async (id, categoryData) => {
    try {
      const response = await fetch(API_ENDPOINTS.CATEGORY_UPDATE(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      if (!response.ok) {
        throw new Error('Failed to update category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  },

  // Delete category
  deleteCategory: async (id) => {
    try {
      const response = await fetch(API_ENDPOINTS.CATEGORY_DELETE(id), {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  },
};
