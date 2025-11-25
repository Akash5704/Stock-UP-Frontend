// services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('stockup_user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Auth API
export const authAPI = {
  signup: (email, password) => api.post('/users/register', { email, password }),
  login: (email, password) => api.post('/users/login', { email, password }),
  getProfile: () => api.get('/users/profile'),
};

export const portfolioAPI = {
  getPortfolio: () => api.get('/api/portfolio'),
  buyStock: (symbol, quantity, price) => 
    api.post('/api/portfolio/buy', { symbol, quantity, price }),
  sellStock: (symbol, quantity, price) => 
    api.post('/api/portfolio/sell', { symbol, quantity, price }),
  getTransactionHistory: (params = {}) => 
    api.get('/api/portfolio/transactions', { params }),
  getPortfolioAnalytics: () => api.get('/api/portfolio/analytics'),
  getHoldingDetails: (symbol) => api.get(`/api/portfolio/holding/${symbol}`),
  addMoney: (amount) => api.post('/api/portfolio/add-money', { amount }),
  withdrawMoney: (amount) => api.post('/api/portfolio/withdraw', { amount }), // Add this line
  getUserBalance: () => api.get('/api/portfolio/balance'),
};

// User API (new section for user-related endpoints)
export const userAPI = {
  getBalance: () => api.get('/api/portfolio/balance'), // Use the correct route
  updateProfile: (data) => api.put('/users/profile', data),
};

// Stock Data API (if you have separate stock data endpoints)
export const stockAPI = {
  getCurrentPrice: (symbol) => 
    axios.get(`https://akash5704-stock-api.hf.space/stock?symbol=${symbol}`),
  searchStocks: (query) => 
    api.get('/stocks/search', { params: { q: query } }),
};

export default api;