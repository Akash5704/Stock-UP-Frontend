import { apiService } from '../services/api.js';

export const authAPI = {
  // Sign up user - now goes to /users/register
  async signup(email, password) {
    return apiService.request('/users/register', {
      method: 'POST',
      body: { email, password },
    });
  },

  // Login user - now goes to /users/login
  async login(email, password) {
    return apiService.request('/users/login', {
      method: 'POST',
      body: { email, password },
    });
  },

  // Get user profile (protected route) - now goes to /users/profile
  async getProfile() {
    return apiService.request('/users/profile', {
      method: 'GET',
      headers: {
        ...apiService.getAuthHeader(),
      },
    });
  },
};
