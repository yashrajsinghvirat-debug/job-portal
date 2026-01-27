import api from './api';

// Register user
export const register = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

// Login user
export const login = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

// Get current user
export const getCurrentUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

// Update user profile
export const updateProfile = async (userData) => {
  const response = await api.put('/users/profile', userData);
  return response.data;
};

// Get all users (admin)
export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Toggle block user (admin)
export const toggleBlockUser = async (userId) => {
  const response = await api.put(`/users/${userId}/block`);
  return response.data;
};
