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
};

export default API_BASE_URL;
