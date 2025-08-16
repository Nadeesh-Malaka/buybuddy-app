// src/services/productService.js
import { API_ENDPOINTS } from './apiConfig';

export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS_ALL);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id));
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId) => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS_BY_CATEGORY(categoryId));
      if (!response.ok) {
        throw new Error('Failed to fetch products by category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Get products by category name
  getProductsByCategoryName: async (categoryName) => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS_BY_CATEGORY_NAME(categoryName));
      if (!response.ok) {
        throw new Error('Failed to fetch products by category name');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by category name:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (keyword) => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS_SEARCH(keyword));
      if (!response.ok) {
        throw new Error('Failed to search products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Get products on sale
  getProductsOnSale: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS_ON_SALE);
      if (!response.ok) {
        throw new Error('Failed to fetch products on sale');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products on sale:', error);
      throw error;
    }
  },

  // Create product
  createProduct: async (productData) => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCT_CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCT_UPDATE(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCT_DELETE(id), {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Upload product image
  uploadProductImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(API_ENDPOINTS.PRODUCT_UPLOAD_IMAGE, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      return await response.text();
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },
};
