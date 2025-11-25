import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { POPULAR_STOCKS } from '../data/stockData';
import StockDetailModal from './StockDetailModal';

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const searchRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isLandingPage = location.pathname === '/';

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = POPULAR_STOCKS.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8);

    setSearchResults(filtered);
    setShowResults(true);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStockSelect = (stock) => {
    // Create a stock object with required properties for the modal
    const stockData = {
      symbol: stock.symbol,
      name: stock.name,
      // These will be fetched by the modal, but we need defaults
      price: 0,
      change: 0,
      changePercent: 0,
      volume: 0,
      error: false,
    };

    setSearchQuery('');
    setShowResults(false);
    setMobileMenuOpen(false);
    setSelectedStock(stockData);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-md bg-opacity-95"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to={isAuthenticated ? '/dashboard' : '/'}
              className="flex items-center space-x-2 flex-shrink-0"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">$</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                StockUp
              </span>
            </Link>

            {/* Search Bar - Only show when authenticated */}
            {isAuthenticated && !isLandingPage && (
              <div
                ref={searchRef}
                className="hidden md:flex flex-1 max-w-lg mx-8 relative"
              >
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search stocks (e.g., AAPL, Tesla)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowResults(true)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  />

                  {/* Search Results Dropdown */}
                  {showResults && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                      {searchResults.map((stock) => (
                        <button
                          key={stock.symbol}
                          onClick={() => handleStockSelect(stock)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-semibold text-gray-900">
                                {stock.name}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                {stock.symbol}
                              </div>
                            </div>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                stock.type === 'index'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {stock.type}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* No Results Message */}
                  {showResults && searchQuery && searchResults.length === 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="px-4 py-3 text-gray-500 text-center">
                        No stocks found for "{searchQuery}"
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 flex-shrink-0">
              {!isLandingPage ? (
                isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/portfolio"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Portfolio
                    </Link>
                    <Link
                      to="/profile"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg hover:shadow-blue-500/50"
                    >
                      Sign Up
                    </Link>
                  </>
                )
              ) : (
                // Landing Page Navbar
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg hover:shadow-blue-500/50"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Search Bar - Only show when authenticated */}
          {isAuthenticated && !isLandingPage && mobileMenuOpen && (
            <div className="md:hidden mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                {/* Mobile Search Results */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                    {searchResults.map((stock) => (
                      <button
                        key={stock.symbol}
                        onClick={() => handleStockSelect(stock)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-semibold text-gray-900">
                          {stock.symbol}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {stock.name}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 space-y-2"
            >
              {!isLandingPage ? (
                isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/portfolio"
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Portfolio
                    </Link>
                    <Link
                      to="/profile"
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={closeMobileMenu}
                      className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center shadow-md"
                    >
                      Sign Up
                    </Link>
                  </div>
                )
              ) : (
                // Landing Page Mobile Navbar
                <div className="flex flex-col justify-center items-center">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center shadow-md"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Stock Detail Modal */}
      {selectedStock && (
        <StockDetailModal
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </>
  );
};

export default Navbar;
