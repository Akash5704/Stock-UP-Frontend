import { apiService } from '../services/api.js';

export const portfolioAPI = {
  // Get user portfolio - now goes to /api/portfolio
  async getPortfolio() {
    return apiService.request('/api/portfolio', {
      method: 'GET',
      headers: {
        ...apiService.getAuthHeader(),
      },
    });
  },

  // Buy stock - now goes to /api/portfolio/buy
  async buyStock(symbol, quantity, price) {
    return apiService.request('/api/portfolio/buy', {
      method: 'POST',
      headers: {
        ...apiService.getAuthHeader(),
      },
      body: { symbol, quantity, price },
    });
  },

  // Sell stock - now goes to /api/portfolio/sell
  async sellStock(symbol, quantity, price) {
    return apiService.request('/api/portfolio/sell', {
      method: 'POST',
      headers: {
        ...apiService.getAuthHeader(),
      },
      body: { symbol, quantity, price },
    });
  },

  // Get transaction history - now goes to /api/portfolio/transactions
  async getTransactionHistory(page = 1, limit = 20, type, symbol) {
    const params = new URLSearchParams({ page, limit });
    if (type) params.append('type', type);
    if (symbol) params.append('symbol', symbol);

    return apiService.request(`/api/portfolio/transactions?${params}`, {
      method: 'GET',
      headers: {
        ...apiService.getAuthHeader(),
      },
    });
  },

  // Get portfolio analytics - now goes to /api/portfolio/analytics
  async getPortfolioAnalytics() {
    return apiService.request('/api/portfolio/analytics', {
      method: 'GET',
      headers: {
        ...apiService.getAuthHeader(),
      },
    });
  },

  // Get holding details - now goes to /api/portfolio/holding/:symbol
  async getHoldingDetails(symbol) {
    return apiService.request(`/api/portfolio/holding/${symbol}`, {
      method: 'GET',
      headers: {
        ...apiService.getAuthHeader(),
      },
    });
  },
};
