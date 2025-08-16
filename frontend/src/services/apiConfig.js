// src/services/apiConfig.js
const API_BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  USER_REGISTER: `${API_BASE_URL}/user/register`,
  USER_LOGIN: `${API_BASE_URL}/user/login`,
  USER_ALL: `${API_BASE_URL}/user/all`,
  USER_BY_ID: (id) => `${API_BASE_URL}/user/${id}`,
  USER_BY_EMAIL: (email) => `${API_BASE_URL}/user/email/${email}`,
  USER_UPDATE: (id) => `${API_BASE_URL}/user/${id}`,
  USER_DELETE: (id) => `${API_BASE_URL}/user/${id}`,
  USER_PROFILE_PICTURE: (id) => `${API_BASE_URL}/user/${id}/profile-picture`,
  
  // Product endpoints
  PRODUCTS_ALL: `${API_BASE_URL}/products`,
  PRODUCT_BY_ID: (id) => `${API_BASE_URL}/products/${id}`,
  PRODUCTS_BY_CATEGORY: (categoryId) => `${API_BASE_URL}/products/category/${categoryId}`,
  PRODUCTS_BY_CATEGORY_NAME: (categoryName) => `${API_BASE_URL}/products/category/name/${categoryName}`,
  PRODUCTS_SEARCH: (keyword) => `${API_BASE_URL}/products/search?keyword=${encodeURIComponent(keyword)}`,
  PRODUCTS_ON_SALE: `${API_BASE_URL}/products/deals`,
  PRODUCTS_AVAILABLE: `${API_BASE_URL}/products/available`,
  PRODUCT_CREATE: `${API_BASE_URL}/products`,
  PRODUCT_UPDATE: (id) => `${API_BASE_URL}/products/${id}`,
  PRODUCT_DELETE: (id) => `${API_BASE_URL}/products/${id}`,
  PRODUCT_UPLOAD_IMAGE: `${API_BASE_URL}/products/upload-image`,
  
  // Category endpoints
  CATEGORIES_ALL: `${API_BASE_URL}/categories`,
  CATEGORY_BY_ID: (id) => `${API_BASE_URL}/categories/${id}`,
  CATEGORY_BY_NAME: (name) => `${API_BASE_URL}/categories/name/${encodeURIComponent(name)}`,
  CATEGORY_CREATE: `${API_BASE_URL}/categories`,
  CATEGORY_UPDATE: (id) => `${API_BASE_URL}/categories/${id}`,
  CATEGORY_DELETE: (id) => `${API_BASE_URL}/categories/${id}`,
};

export default API_BASE_URL;
