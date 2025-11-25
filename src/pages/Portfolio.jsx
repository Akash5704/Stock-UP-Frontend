// components/Portfolio.jsx
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  Wallet,
  Plus,
  Minus,
  RefreshCw,
  BarChart3,
  History,
} from 'lucide-react';
import { portfolioAPI, stockAPI, userAPI } from '../services/api';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('buy');
  const [quantity, setQuantity] = useState(1);
  const [cashBalance, setCashBalance] = useState(0);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [moneyAmount, setMoneyAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');
  const [balanceLoading, setBalanceLoading] = useState(false);

  // Fetch user balance separately
  const fetchUserBalance = async () => {
    try {
      setBalanceLoading(true);
      const response = await userAPI.getBalance();
      if (response.success) {
        setCashBalance(response.balance);
      }
    } catch (error) {
      console.error('Error fetching user balance:', error);
      // If balance endpoint fails, try to get it from portfolio
      if (portfolio?.userId?.balance) {
        setCashBalance(portfolio.userId.balance);
      }
    } finally {
      setBalanceLoading(false);
    }
  };

  // Fetch portfolio data
  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await portfolioAPI.getPortfolio();
      setPortfolio(response.portfolio);
      
      // Try to get balance from portfolio first, then fetch separately
      if (response.portfolio?.userId?.balance) {
        setCashBalance(response.portfolio.userId.balance);
      } else {
        // If portfolio doesn't have balance, fetch it separately
        await fetchUserBalance();
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setError(error.message || 'Failed to load portfolio data');
      
      // Even if portfolio fails, try to get balance
      await fetchUserBalance();
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const response = await portfolioAPI.getTransactionHistory();
      setTransactions(response.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError(error.message || 'Failed to load transactions');
    }
  };

  // Fetch analytics
  const fetchAnalytics = async () => {
    try {
      const response = await portfolioAPI.getPortfolioAnalytics();
      setAnalytics(response.analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError(error.message || 'Failed to load analytics');
    }
  };

  // Fetch current stock price
  const fetchCurrentPrice = async (symbol) => {
    try {
      const response = await stockAPI.getCurrentPrice(symbol);
      return response.data.price;
    } catch (error) {
      console.error('Error fetching current price:', error);
      // Return a default price if API fails
      return 100;
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleBuySell = async (holding, type) => {
    try {
      // Fetch current price before showing modal
      const currentPrice = await fetchCurrentPrice(holding.symbol);
      setSelectedStock({
        ...holding,
        currentPrice
      });
      setModalType(type);
      setShowModal(true);
      setQuantity(1);
    } catch (error) {
      setError('Failed to fetch current stock price');
    }
  };

  const executeTransaction = async () => {
    if (!selectedStock) return;

    try {
      setError('');
      let response;

      if (modalType === 'buy') {
        response = await portfolioAPI.buyStock(
          selectedStock.symbol,
          parseInt(quantity),
          selectedStock.currentPrice
        );
      } else {
        response = await portfolioAPI.sellStock(
          selectedStock.symbol,
          parseInt(quantity),
          selectedStock.currentPrice
        );
      }

      alert(response.message || 'Transaction successful!');
      setShowModal(false);
      setSelectedStock(null);

      // Refresh portfolio data and balance
      await fetchPortfolio();

    } catch (error) {
      console.error('Transaction error:', error);
      setError(error.message || 'Transaction failed. Please try again.');
    }
  };

  const handleAddMoney = async () => {
    const amount = parseFloat(moneyAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      setError('');
      const response = await portfolioAPI.addMoney(amount);
      
      // Update cash balance from response
      if (response.newBalance !== undefined) {
        setCashBalance(response.newBalance);
      } else {
        // If response doesn't have newBalance, refresh the balance
        await fetchUserBalance();
      }
      
      setShowAddMoneyModal(false);
      setMoneyAmount('');
      alert(response.message || `Successfully added $${amount.toFixed(2)} to your account`);
      
      // Refresh portfolio to get updated data
      await fetchPortfolio();
    } catch (error) {
      setError(error.message || 'Failed to add money');
    }
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (amount > cashBalance) {
      setError('Insufficient balance for withdrawal');
      return;
    }

    try {
      setError('');
      const response = await portfolioAPI.withdrawMoney(amount);
      
      // Update cash balance from response
      if (response.newBalance !== undefined) {
        setCashBalance(response.newBalance);
      } else {
        // If response doesn't have newBalance, refresh the balance
        await fetchUserBalance();
      }
      
      setShowWithdrawModal(false);
      setWithdrawAmount('');
      alert(response.message || `Successfully withdrawn $${amount.toFixed(2)} from your account`);
      
      // Refresh portfolio to get updated data
      await fetchPortfolio();
    } catch (error) {
      setError(error.message || 'Failed to withdraw money');
    }
  };

  const handleRefreshBalance = async () => {
    await fetchUserBalance();
  };

  const profitLossClass = (value) =>
    value >= 0 ? 'text-emerald-400' : 'text-red-400';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading portfolio...</div>
        </div>
      </div>
    );
  }

  if (error && !portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-400 text-xl">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              My Portfolio
            </h1>
            <p className="text-gray-400 text-lg">
              Track your investments and performance
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowAnalytics(true);
                fetchAnalytics();
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
            <button
              onClick={() => {
                setShowTransactions(true);
                fetchTransactions();
              }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <History className="w-4 h-4" />
              Transactions
            </button>
            <button
              onClick={fetchPortfolio}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Updated Cash Balance Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 border border-blue-500/50 rounded-2xl p-6 shadow-2xl backdrop-blur-sm hover:border-blue-400 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-blue-200" />
                <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">
                  Cash Balance
                </p>
              </div>
              <button
                onClick={handleRefreshBalance}
                disabled={balanceLoading}
                className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 flex items-center justify-center backdrop-blur-sm border border-white/30 disabled:opacity-50"
                title="Refresh Balance"
              >
                <RefreshCw className={`w-4 h-4 ${balanceLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            <div className="flex items-end justify-between mb-4">
              <p className="text-4xl font-bold text-white">
                ${cashBalance.toFixed(2)}
              </p>
              {balanceLoading && (
                <div className="text-blue-200 text-sm">Updating...</div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowAddMoneyModal(true)}
                className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm border border-white/30"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm border border-red-500/30"
              >
                <Minus className="w-4 h-4" />
                Withdraw
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 border border-gray-700/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                Total Value
              </p>
              <DollarSign className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-4xl font-bold text-white mb-1">
              ${portfolio?.totalValue?.toFixed(2) || '0.00'}
            </p>
            <p className="text-gray-500 text-sm">Portfolio balance</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 border border-gray-700/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                Total P/L
              </p>
              {portfolio?.totalProfitLoss >= 0 ? (
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
            </div>
            <p
              className={`text-4xl font-bold mb-1 ${profitLossClass(
                portfolio?.totalProfitLoss || 0
              )}`}
            >
              {portfolio?.totalProfitLoss >= 0 ? '+' : ''}$
              {(portfolio?.totalProfitLoss || 0).toFixed(2)}
            </p>
            <p className="text-gray-500 text-sm">All-time profit/loss</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 border border-gray-700/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                Return
              </p>
              {portfolio?.profitLossPercentage >= 0 ? (
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
            </div>
            <p
              className={`text-4xl font-bold mb-1 ${profitLossClass(
                portfolio?.profitLossPercentage || 0
              )}`}
            >
              {portfolio?.profitLossPercentage >= 0 ? '+' : ''}
              {(portfolio?.profitLossPercentage || 0).toFixed(2)}%
            </p>
            <p className="text-gray-500 text-sm">Total return</p>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 border border-gray-700/50 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-700/50">
            <h2 className="text-2xl font-bold text-white">Holdings</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900/50">
                  <th className="px-8 py-5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-8 py-5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-8 py-5 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Avg Buy Price
                  </th>
                  <th className="px-8 py-5 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Current Price
                  </th>
                  <th className="px-8 py-5 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    P/L
                  </th>
                  <th className="px-8 py-5 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {portfolio?.holdings?.map((holding) => (
                  <tr
                    key={holding.symbol}
                    className="hover:bg-gray-700/30 transition-colors duration-200"
                  >
                    <td className="px-8 py-6">
                      <span className="text-white font-bold text-lg">
                        {holding.symbol}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-white font-semibold">
                        {holding.quantity}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-gray-300">
                        ${holding.averageBuyPrice?.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-white font-semibold">
                        ${holding.currentPrice?.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex flex-col items-end">
                        <span
                          className={`font-bold text-lg ${profitLossClass(
                            holding.profitLoss
                          )}`}
                        >
                          {holding.profitLoss >= 0 ? '+' : ''}$
                          {holding.profitLoss?.toFixed(2)}
                        </span>
                        <span
                          className={`text-sm ${profitLossClass(
                            holding.profitLossPercentage
                          )}`}
                        >
                          {holding.profitLossPercentage >= 0 ? '+' : ''}
                          {holding.profitLossPercentage?.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleBuySell(holding, 'buy')}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-emerald-500/50"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Buy
                        </button>
                        <button
                          onClick={() => handleBuySell(holding, 'sell')}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-red-500/50"
                        >
                          <DollarSign className="w-4 h-4" />
                          Sell
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!portfolio?.holdings?.length && (
                  <tr>
                    <td colSpan="6" className="px-8 py-12 text-center">
                      <div className="text-gray-400 text-lg">
                        No holdings yet. Start by buying some stocks!
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Money Modal */}
      {showAddMoneyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700 overflow-hidden">
            <div className="px-8 py-6 bg-blue-500/10 border-b border-blue-500/20">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Wallet className="w-7 h-7 text-blue-400" />
                Add Money
              </h3>
              <p className="text-gray-300 mt-1">
                Deposit funds to your account
              </p>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <label className="block text-gray-300 font-semibold mb-3">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={moneyAmount}
                    onChange={(e) => setMoneyAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-6 mb-6 border border-gray-600">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-300">Current Balance</span>
                  <span className="text-white font-semibold">
                    ${cashBalance.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-600">
                  <span className="text-gray-300 font-semibold">
                    New Balance
                  </span>
                  <span className="text-white font-bold text-xl">
                    ${(cashBalance + (parseFloat(moneyAmount) || 0)).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAddMoneyModal(false);
                    setMoneyAmount('');
                  }}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMoney}
                  className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Funds
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Money Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700 overflow-hidden">
            <div className="px-8 py-6 bg-red-500/10 border-b border-red-500/20">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Wallet className="w-7 h-7 text-red-400" />
                Withdraw Money
              </h3>
              <p className="text-gray-300 mt-1">
                Withdraw funds from your account
              </p>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <label className="block text-gray-300 font-semibold mb-3">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    max={cashBalance}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Available balance: ${cashBalance.toFixed(2)}
                </p>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-6 mb-6 border border-gray-600">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-300">Current Balance</span>
                  <span className="text-white font-semibold">
                    ${cashBalance.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-600">
                  <span className="text-gray-300 font-semibold">
                    New Balance
                  </span>
                  <span className="text-white font-bold text-xl">
                    ${(cashBalance - (parseFloat(withdrawAmount) || 0)).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setWithdrawAmount('');
                  }}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdraw}
                  disabled={parseFloat(withdrawAmount) > cashBalance || !withdrawAmount || parseFloat(withdrawAmount) <= 0}
                  className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                  Withdraw Funds
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buy/Sell Modal */}
      {showModal && selectedStock && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700 overflow-hidden">
            <div
              className={`px-8 py-6 ${
                modalType === 'buy'
                  ? 'bg-emerald-500/10 border-b border-emerald-500/20'
                  : 'bg-red-500/10 border-b border-red-500/20'
              }`}
            >
              <h3 className="text-2xl font-bold text-white">
                {modalType === 'buy' ? 'Buy' : 'Sell'} {selectedStock.symbol}
              </h3>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <label className="block text-gray-300 font-semibold mb-3">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max={
                    modalType === 'sell' ? selectedStock.quantity : undefined
                  }
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {modalType === 'sell' && (
                  <p className="text-gray-400 text-sm mt-2">
                    Available: {selectedStock.quantity} shares
                  </p>
                )}
              </div>

              <div className="bg-gray-700/50 rounded-lg p-6 mb-6 border border-gray-600">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-300">Price per share</span>
                  <span className="text-white font-semibold">
                    ${selectedStock.currentPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-3 pb-3 border-b border-gray-600">
                  <span className="text-gray-300 font-semibold">Total</span>
                  <span className="text-white font-bold text-xl">
                    ${(selectedStock.currentPrice * quantity).toFixed(2)}
                  </span>
                </div>
                {modalType === 'buy' && (
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Cash Balance</span>
                    <span
                      className={`font-semibold text-sm ${
                        cashBalance >= selectedStock.currentPrice * quantity
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}
                    >
                      ${cashBalance.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={executeTransaction}
                  disabled={
                    modalType === 'buy' &&
                    cashBalance < selectedStock.currentPrice * quantity
                  }
                  className={`flex-1 px-6 py-3 ${
                    modalType === 'buy'
                      ? 'bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600'
                      : 'bg-red-500 hover:bg-red-600'
                  } text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg disabled:cursor-not-allowed`}
                >
                  Confirm {modalType === 'buy' ? 'Buy' : 'Sell'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Modal */}
      {showTransactions && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-gray-700">
            <div className="px-8 py-6 bg-purple-500/10 border-b border-purple-500/20 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <History className="w-7 h-7 text-purple-400" />
                Transaction History
              </h3>
              <button
                onClick={() => setShowTransactions(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto max-h-[60vh]">
              <table className="w-full">
                <thead className="bg-gray-900/50 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                      Symbol
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {transactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-gray-700/30">
                      <td className="px-6 py-4 text-gray-300">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            transaction.type === 'BUY'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white font-semibold">
                        {transaction.symbol}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-300">
                        {transaction.quantity}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-300">
                        ${transaction.price?.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right text-white font-semibold">
                        ${transaction.totalAmount?.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {transactions.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-gray-400"
                      >
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalytics && analytics && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-gray-700">
            <div className="px-8 py-6 bg-blue-500/10 border-b border-blue-500/20 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="w-7 h-7 text-blue-400" />
                Portfolio Analytics
              </h3>
              <button
                onClick={() => setShowAnalytics(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Performers */}
                <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                  <h4 className="text-lg font-bold text-white mb-4">
                    Top Performers
                  </h4>
                  {analytics.topPerformers.map((stock, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-600 last:border-b-0"
                    >
                      <span className="text-white font-semibold">
                        {stock.symbol}
                      </span>
                      <span className="text-emerald-400 font-bold">
                        +{stock.profitLossPercentage?.toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Largest Holdings */}
                <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                  <h4 className="text-lg font-bold text-white mb-4">
                    Largest Holdings
                  </h4>
                  {analytics.largestHoldings.map((holding, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-600 last:border-b-0"
                    >
                      <span className="text-white font-semibold">
                        {holding.symbol}
                      </span>
                      <span className="text-blue-400 font-bold">
                        ${holding.currentValue?.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;