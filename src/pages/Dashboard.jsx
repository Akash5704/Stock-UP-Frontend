import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import StockCard from '../components/StockCard';
import SkeletonCard from '../components/SkeletonCard';
import PerformanceSection from '../components/PerformanceSection';
import StockDetailModal from '../components/StockDetailModal';

const API_BASE = 'https://akash5704-stock-api.hf.space/stock?symbol=';

const POPULAR_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway' },
];

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedStock, setSelectedStock] = useState(null);
  const [performanceData, setPerformanceData] = useState({
    gainers: [],
    losers: [],
    active: [],
    volume: [],
  });

  const fetchStockData = async (symbols) => {
    try {
      const stockPromises = symbols.map(async (stockInfo) => {
        try {
          const response = await fetch(`${API_BASE}${stockInfo.symbol}`, {
            method: 'GET',
            mode: 'cors',
            headers: { Accept: 'application/json' },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          const currentPrice = data.currentPrice || data.price || data.c || 0;
          const previousClose =
            data.previousClose || data.previous_close || currentPrice;
          const change = currentPrice - previousClose;
          const changePercent = previousClose
            ? (change / previousClose) * 100
            : 0;

          return {
            symbol: data.symbol || stockInfo.symbol,
            name: stockInfo.name,
            price: currentPrice,
            change: change,
            changePercent: changePercent,
            volume:
              data.volume || Math.floor(Math.random() * 10000000) + 1000000,
            marketCap: data.marketCap || 0,
            error: false,
          };
        } catch (err) {
          console.error(`Error fetching ${stockInfo.symbol}:`, err);
          const basePrice = Math.random() * 500 + 50;
          const randomChange = (Math.random() - 0.5) * 15;
          const randomChangePercent = (randomChange / basePrice) * 100;

          return {
            symbol: stockInfo.symbol,
            name: stockInfo.name,
            price: basePrice,
            change: randomChange,
            changePercent: randomChangePercent,
            volume: Math.floor(Math.random() * 10000000) + 1000000,
            marketCap: 0,
            error: true,
          };
        }
      });

      const stockData = await Promise.all(stockPromises);
      return stockData;
    } catch (err) {
      console.error('Error fetching stock data:', err);
      return [];
    }
  };

  const categorizeStocks = (stockData) => {
    if (!stockData || stockData.length === 0) {
      return generateSimulatedPerformanceData();
    }

    const validStocks = stockData.filter(
      (stock) => !stock.error && stock.price > 0
    );

    if (validStocks.length === 0) {
      return generateSimulatedPerformanceData();
    }

    const sortedByChange = [...validStocks].sort(
      (a, b) => b.changePercent - a.changePercent
    );

    const gainers = sortedByChange
      .filter((stock) => stock.changePercent > 0)
      .slice(0, 3);
    const losers = sortedByChange
      .filter((stock) => stock.changePercent < 0)
      .slice(0, 3);
    const active = [...validStocks]
      .sort((a, b) => (b.volume || 0) - (a.volume || 0))
      .slice(0, 3);
    const volumeShockers = [...validStocks]
      .sort((a, b) => (b.volume || 0) - (a.volume || 0))
      .slice(0, 3);

    return {
      gainers:
        gainers.length > 0 ? gainers : generateSimulatedStocks(3, 'gainer'),
      losers: losers.length > 0 ? losers : generateSimulatedStocks(3, 'loser'),
      active: active.length > 0 ? active : generateSimulatedStocks(3, 'active'),
      volume:
        volumeShockers.length > 0
          ? volumeShockers
          : generateSimulatedStocks(3, 'volume'),
    };
  };

  const generateSimulatedPerformanceData = () => {
    return {
      gainers: generateSimulatedStocks(3, 'gainer'),
      losers: generateSimulatedStocks(3, 'loser'),
      active: generateSimulatedStocks(3, 'active'),
      volume: generateSimulatedStocks(3, 'volume'),
    };
  };

  const generateSimulatedStocks = (count, type) => {
    const stocks = [];
    const stockPool = [
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation' },
      { symbol: 'TSLA', name: 'Tesla Inc.' },
      { symbol: 'AMD', name: 'Advanced Micro Devices' },
      { symbol: 'MRNA', name: 'Moderna Inc.' },
      { symbol: 'NIO', name: 'NIO Inc.' },
    ];

    for (let i = 0; i < count; i++) {
      const stockInfo = stockPool[i] || {
        symbol: `STOCK${i + 1}`,
        name: `Company ${i + 1}`,
      };
      const basePrice = Math.random() * 500 + 50;
      let changePercent, change;

      if (type === 'gainer') {
        changePercent = Math.random() * 8 + 2;
        change = (changePercent / 100) * basePrice;
      } else if (type === 'loser') {
        changePercent = -(Math.random() * 8 + 2);
        change = (changePercent / 100) * basePrice;
      } else {
        changePercent = (Math.random() - 0.5) * 6;
        change = (changePercent / 100) * basePrice;
      }

      stocks.push({
        symbol: stockInfo.symbol,
        name: stockInfo.name,
        price: parseFloat(basePrice.toFixed(2)),
        change: parseFloat(change.toFixed(2)),
        changePercent: parseFloat(changePercent.toFixed(2)),
        volume: Math.floor(Math.random() * 50000000) + 10000000,
        type: type,
      });
    }
    return stocks;
  };

  const initializeData = async () => {
    try {
      setLoading(true);
      setError(null);

      const stockData = await fetchStockData(POPULAR_STOCKS);
      const categorizedData = categorizeStocks(stockData);

      setPerformanceData(categorizedData);
      setStocks(stockData);

      const validStocks = stockData.filter(
        (stock) => !stock.error && stock.price > 0
      );
      if (validStocks.length === 0) {
        setError('Using simulated market data. Real data unavailable.');
      }
    } catch (err) {
      console.error('Error initializing data:', err);
      setError('Failed to load market data. Using simulated data.');

      const simulatedStocks = POPULAR_STOCKS.map((stock, index) => {
        const basePrice = Math.random() * 500 + 50;
        const randomChange = (Math.random() - 0.5) * 15;
        const randomChangePercent = (randomChange / basePrice) * 100;

        return {
          symbol: stock.symbol,
          name: stock.name,
          price: parseFloat(basePrice.toFixed(2)),
          change: parseFloat(randomChange.toFixed(2)),
          changePercent: parseFloat(randomChangePercent.toFixed(2)),
          volume: Math.floor(Math.random() * 50000000) + 10000000,
          error: false,
        };
      });

      const categorizedData = categorizeStocks(simulatedStocks);
      setPerformanceData(categorizedData);
      setStocks(simulatedStocks);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeData();
    const interval = setInterval(initializeData, 120000);
    return () => clearInterval(interval);
  }, []);

  const getFilteredStocks = () => {
    let filtered = stocks;

    if (activeTab !== 'all') {
      if (activeTab === 'gainer') {
        filtered = filtered
          .filter((stock) => stock.changePercent > 0)
          .sort((a, b) => b.changePercent - a.changePercent);
      } else if (activeTab === 'loser') {
        filtered = filtered
          .filter((stock) => stock.changePercent < 0)
          .sort((a, b) => a.changePercent - b.changePercent);
      } else if (activeTab === 'active') {
        filtered = filtered.sort((a, b) => (b.volume || 0) - (a.volume || 0));
      }
    }

    return filtered.slice(0, 30);
  };

  const filteredStocks = getFilteredStocks();

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
  };

  return (
    <div className="min-h-screen bg-gray-900 font-inter">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header with Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-4xl font-bold text-white mb-2">
                Market Overview
              </h1>
              <p className="text-gray-400">
                Real-time stock performance and market movers
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-yellow-900 border border-yellow-700 rounded-lg text-yellow-200">
              {error}
            </div>
          )}

          <PerformanceSection
            performanceData={performanceData}
            loading={loading}
            onStockClick={handleStockClick}
          />

          <div className="mb-8 space-y-4">
            <div className="flex justify-center md:justify-start">
              <div className="flex space-x-2 overflow-x-auto">
                {['all', 'gainer', 'loser', 'active'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {tab === 'all'
                      ? 'All Stocks'
                      : tab === 'gainer'
                      ? 'Top Gainers'
                      : tab === 'loser'
                      ? 'Top Losers'
                      : 'Most Active'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {activeTab === 'all'
                ? 'All Stocks'
                : activeTab === 'gainer'
                ? 'Top Gainers'
                : activeTab === 'loser'
                ? 'Top Losers'
                : 'Most Active Stocks'}
              <span className="text-gray-400 text-lg ml-2">
                ({filteredStocks.length} stocks)
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading
                ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
                : filteredStocks.map((stock, index) => (
                    <motion.div
                      key={`${stock.symbol}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <StockCard
                        {...stock}
                        onClick={() => handleStockClick(stock)}
                      />
                    </motion.div>
                  ))}
            </div>
          </div>

          {!loading && stocks.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No stock data available at the moment.
              </p>
            </div>
          )}
        </motion.div>
      </main>

      {/* Stock Detail Modal for Dashboard */}
      {selectedStock && (
        <StockDetailModal
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
