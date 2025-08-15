// src/services/userService.js
import { API_ENDPOINTS } from './apiConfig';

class UserService {
  // Register a new user
  async registerUser(userData) {
    try {
      const response = await fetch(API_ENDPOINTS.USER_REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          name: userData.fullName,
          password: userData.password,
          number: userData.number || '',
          profilePic: userData.profilePic || ''
        })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  }

  // Login user
  async loginUser(loginData) {
    try {
      const response = await fetch(API_ENDPOINTS.USER_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid email or password');
        }
        throw new Error('Login failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  }

  // Get all users
  async getAllUsers() {
    try {
      const response = await fetch(API_ENDPOINTS.USER_ALL);
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users');
    }
  }

  // Get user by ID
  async getUserById(id) {
    try {
      const response = await fetch(API_ENDPOINTS.USER_BY_ID(id));
      
      if (!response.ok) {
        throw new Error('User not found');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user');
    }
  }

  // Update user
  async updateUser(id, userData) {
    try {
      const response = await fetch(API_ENDPOINTS.USER_UPDATE(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Update failed');
    }
  }

  // Delete user
  async deleteUser(id) {
    try {
      const response = await fetch(API_ENDPOINTS.USER_DELETE(id), {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      return true;
    } catch (error) {
      throw new Error(error.message || 'Delete failed');
    }
  }

  // Upload profile picture
  async uploadProfilePicture(id, file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(API_ENDPOINTS.USER_PROFILE_PICTURE(id), {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile picture');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to upload profile picture');
    }
  }
}

export default new UserService();
