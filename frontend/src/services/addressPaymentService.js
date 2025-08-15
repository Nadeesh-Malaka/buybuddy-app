import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Add request interceptor for debugging
axios.interceptors.request.use(request => {
  console.log('Starting Request:', request.method?.toUpperCase(), request.url);
  return request;
});

// Add response interceptor for debugging
axios.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  error => {
    console.log('Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// Address API calls
export const addressService = {
  // Get all addresses for a user
  getUserAddresses: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/addresses/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user addresses:', error);
      if (error.response) {
        throw new Error(error.response.data.message || error.response.data || 'Failed to fetch addresses');
      }
      throw new Error('Network error. Please check your connection.');
    }
  },

  // Add new address
  addAddress: async (userId, addressData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/addresses/user/${userId}`, addressData);
      return response.data;
    } catch (error) {
      console.error('Error adding address:', error);
      if (error.response) {
        throw new Error(error.response.data.message || error.response.data || 'Failed to add address');
      }
      throw new Error('Network error. Please check your connection.');
    }
  },

  // Update address
  updateAddress: async (addressId, addressData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/addresses/${addressId}`, addressData);
      return response.data;
    } catch (error) {
      console.error('Error updating address:', error);
      if (error.response) {
        throw new Error(error.response.data.message || error.response.data || 'Failed to update address');
      }
      throw new Error('Network error. Please check your connection.');
    }
  },

  // Set address as default
  setDefaultAddress: async (addressId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/addresses/${addressId}/set-default`);
      return response.data;
    } catch (error) {
      console.error('Error setting default address:', error);
      throw error;
    }
  },

  // Delete address
  deleteAddress: async (addressId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/addresses/${addressId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  },

  // Get address by ID
  getAddressById: async (addressId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/addresses/${addressId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching address:', error);
      throw error;
    }
  }
};

// Payment Method API calls
export const paymentMethodService = {
  // Get all payment methods for a user
  getUserPaymentMethods: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payment-methods/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user payment methods:', error);
      if (error.response) {
        throw new Error(error.response.data.message || error.response.data || 'Failed to fetch payment methods');
      }
      throw new Error('Network error. Please check your connection.');
    }
  },

  // Add new payment method
  addPaymentMethod: async (userId, paymentMethodData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/payment-methods/user/${userId}`, paymentMethodData);
      return response.data;
    } catch (error) {
      console.error('Error adding payment method:', error);
      if (error.response) {
        throw new Error(error.response.data.message || error.response.data || 'Failed to add payment method');
      }
      throw new Error('Network error. Please check your connection.');
    }
  },

  // Update payment method
  updatePaymentMethod: async (paymentMethodId, paymentMethodData) => {
    try {
      console.log('Updating payment method:', paymentMethodId, paymentMethodData);
      const response = await axios.put(`${API_BASE_URL}/payment-methods/${paymentMethodId}`, paymentMethodData);
      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating payment method:', error);
      console.error('Error response:', error.response?.data);
      if (error.response) {
        throw new Error(error.response.data.message || error.response.data || 'Failed to update payment method');
      }
      throw new Error('Network error. Please check your connection.');
    }
  },

  // Set payment method as default
  setDefaultPaymentMethod: async (paymentMethodId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/payment-methods/${paymentMethodId}/set-default`);
      return response.data;
    } catch (error) {
      console.error('Error setting default payment method:', error);
      throw error;
    }
  },

  // Delete payment method
  deletePaymentMethod: async (paymentMethodId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/payment-methods/${paymentMethodId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting payment method:', error);
      throw error;
    }
  },

  // Get payment method by ID
  getPaymentMethodById: async (paymentMethodId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payment-methods/${paymentMethodId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment method:', error);
      throw error;
    }
  }
};
