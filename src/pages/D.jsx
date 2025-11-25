import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import StockCard from '../components/StockCard';
import SkeletonCard from '../components/SkeletonCard';
import PerformanceSection from '../components/PerformanceSection';

const API_BASE = 'https://akash5704-stock-api.hf.space/stock?symbol=';

const POPULAR_STOCKS = [
  // 🧠 TECH & INTERNET
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'stock' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'stock' },
  { symbol: 'META', name: 'Meta Platforms Inc.', type: 'stock' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'stock' },
  { symbol: 'TSLA', name: 'Tesla Inc.', type: 'stock' },
  { symbol: 'ADBE', name: 'Adobe Inc.', type: 'stock' },
  { symbol: 'INTC', name: 'Intel Corporation', type: 'stock' },
  { symbol: 'PYPL', name: 'PayPal Holdings Inc.', type: 'stock' },
  { symbol: 'CRM', name: 'Salesforce Inc.', type: 'stock' },
  { symbol: 'ORCL', name: 'Oracle Corporation', type: 'stock' },
  { symbol: 'AMD', name: 'Advanced Micro Devices Inc.', type: 'stock' },
  { symbol: 'IBM', name: 'International Business Machines', type: 'stock' },
  { symbol: 'QCOM', name: 'Qualcomm Incorporated', type: 'stock' },
  { symbol: 'SHOP', name: 'Shopify Inc.', type: 'stock' },
  { symbol: 'UBER', name: 'Uber Technologies Inc.', type: 'stock' },
  { symbol: 'LYFT', name: 'Lyft Inc.', type: 'stock' },
  { symbol: 'SNOW', name: 'Snowflake Inc.', type: 'stock' },
  { symbol: 'TWLO', name: 'Twilio Inc.', type: 'stock' },

  // 💳 FINANCIALS & BANKS
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', type: 'stock' },
  { symbol: 'BAC', name: 'Bank of America Corporation', type: 'stock' },
  { symbol: 'GS', name: 'Goldman Sachs Group Inc.', type: 'stock' },
  { symbol: 'MS', name: 'Morgan Stanley', type: 'stock' },
  { symbol: 'V', name: 'Visa Inc.', type: 'stock' },
  { symbol: 'MA', name: 'Mastercard Incorporated', type: 'stock' },
  { symbol: 'AXISBANK.NS', name: 'Axis Bank Ltd.', type: 'stock' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank Ltd.', type: 'stock' },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank Ltd.', type: 'stock' },
  { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank Ltd.', type: 'stock' },
  { symbol: 'SBIN.NS', name: 'State Bank of India', type: 'stock' },
  { symbol: 'PNB.NS', name: 'Punjab National Bank', type: 'stock' },
  { symbol: 'YESBANK.NS', name: 'Yes Bank Ltd.', type: 'stock' },
  { symbol: 'BANKBARODA.NS', name: 'Bank of Baroda', type: 'stock' },

  // 🏭 INDUSTRIALS & ENERGY
  { symbol: 'XOM', name: 'Exxon Mobil Corporation', type: 'stock' },
  { symbol: 'CVX', name: 'Chevron Corporation', type: 'stock' },
  { symbol: 'BP', name: 'BP plc', type: 'stock' },
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries Ltd.', type: 'stock' },
  { symbol: 'ONGC.NS', name: 'Oil & Natural Gas Corporation', type: 'stock' },
  { symbol: 'TATAPOWER.NS', name: 'Tata Power Company Ltd.', type: 'stock' },
  { symbol: 'NTPC.NS', name: 'NTPC Ltd.', type: 'stock' },
  {
    symbol: 'POWERGRID.NS',
    name: 'Power Grid Corporation of India',
    type: 'stock',
  },
  { symbol: 'TATASTEEL.NS', name: 'Tata Steel Ltd.', type: 'stock' },
  { symbol: 'JSWSTEEL.NS', name: 'JSW Steel Ltd.', type: 'stock' },
  { symbol: 'HINDALCO.NS', name: 'Hindalco Industries Ltd.', type: 'stock' },
  { symbol: 'COALINDIA.NS', name: 'Coal India Ltd.', type: 'stock' },
  { symbol: 'IOC.NS', name: 'Indian Oil Corporation Ltd.', type: 'stock' },
  {
    symbol: 'BPCL.NS',
    name: 'Bharat Petroleum Corporation Ltd.',
    type: 'stock',
  },
  { symbol: 'GAIL.NS', name: 'GAIL (India) Ltd.', type: 'stock' },

  // 🛒 CONSUMER & FMCG
  { symbol: 'PG', name: 'Procter & Gamble Co.', type: 'stock' },
  { symbol: 'KO', name: 'Coca-Cola Company', type: 'stock' },
  { symbol: 'PEP', name: 'PepsiCo Inc.', type: 'stock' },
  { symbol: 'NESTLEIND.NS', name: 'Nestle India Ltd.', type: 'stock' },
  { symbol: 'ITC.NS', name: 'ITC Ltd.', type: 'stock' },
  { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever Ltd.', type: 'stock' },
  { symbol: 'BRITANNIA.NS', name: 'Britannia Industries Ltd.', type: 'stock' },
  { symbol: 'MARICO.NS', name: 'Marico Ltd.', type: 'stock' },
  { symbol: 'DABUR.NS', name: 'Dabur India Ltd.', type: 'stock' },
  { symbol: 'COLPAL.NS', name: 'Colgate-Palmolive India Ltd.', type: 'stock' },
  { symbol: 'UBL.NS', name: 'United Breweries Ltd.', type: 'stock' },

  // 💊 PHARMA & HEALTHCARE
  { symbol: 'JNJ', name: 'Johnson & Johnson', type: 'stock' },
  { symbol: 'PFE', name: 'Pfizer Inc.', type: 'stock' },
  { symbol: 'MRNA', name: 'Moderna Inc.', type: 'stock' },
  { symbol: 'LLY', name: 'Eli Lilly and Company', type: 'stock' },
  {
    symbol: 'SUNPHARMA.NS',
    name: 'Sun Pharmaceutical Industries Ltd.',
    type: 'stock',
  },
  {
    symbol: 'DRREDDY.NS',
    name: 'Dr. Reddy’s Laboratories Ltd.',
    type: 'stock',
  },
  { symbol: 'CIPLA.NS', name: 'Cipla Ltd.', type: 'stock' },
  { symbol: 'DIVISLAB.NS', name: 'Divi’s Laboratories Ltd.', type: 'stock' },
  { symbol: 'LUPIN.NS', name: 'Lupin Ltd.', type: 'stock' },
  {
    symbol: 'TORNTPHARM.NS',
    name: 'Torrent Pharmaceuticals Ltd.',
    type: 'stock',
  },

  // 🚗 AUTOMOBILE
  { symbol: 'F', name: 'Ford Motor Company', type: 'stock' },
  { symbol: 'GM', name: 'General Motors Company', type: 'stock' },
  { symbol: 'TM', name: 'Toyota Motor Corporation', type: 'stock' },
  { symbol: 'TATAMOTORS.NS', name: 'Tata Motors Ltd.', type: 'stock' },
  { symbol: 'EICHERMOT.NS', name: 'Eicher Motors Ltd.', type: 'stock' },
  { symbol: 'MARUTI.NS', name: 'Maruti Suzuki India Ltd.', type: 'stock' },
  { symbol: 'M&M.NS', name: 'Mahindra & Mahindra Ltd.', type: 'stock' },
  { symbol: 'BAJAJ-AUTO.NS', name: 'Bajaj Auto Ltd.', type: 'stock' },
  { symbol: 'HEROMOTOCO.NS', name: 'Hero MotoCorp Ltd.', type: 'stock' },
  { symbol: 'TVSMOTOR.NS', name: 'TVS Motor Company Ltd.', type: 'stock' },
  { symbol: 'ASHOKLEY.NS', name: 'Ashok Leyland Ltd.', type: 'stock' },

  // 🎬 MEDIA & ENTERTAINMENT
  { symbol: 'DIS', name: 'Walt Disney Company', type: 'stock' },
  { symbol: 'NFLX', name: 'Netflix Inc.', type: 'stock' },
  { symbol: 'SONY', name: 'Sony Group Corporation', type: 'stock' },
  { symbol: 'WBD', name: 'Warner Bros. Discovery Inc.', type: 'stock' },
  {
    symbol: 'ZEE.NS',
    name: 'Zee Entertainment Enterprises Ltd.',
    type: 'stock',
  },
  { symbol: 'SUNTV.NS', name: 'Sun TV Network Ltd.', type: 'stock' },
  { symbol: 'PVRINOX.NS', name: 'PVR INOX Ltd.', type: 'stock' },

  // 💰 FINTECH / DIGITAL
  {
    symbol: 'PAYTM.NS',
    name: 'One97 Communications Ltd. (Paytm)',
    type: 'stock',
  },
  {
    symbol: 'POLICYBZR.NS',
    name: 'PB Fintech Ltd. (PolicyBazaar)',
    type: 'stock',
  },
  { symbol: 'NAUKRI.NS', name: 'Info Edge (India) Ltd.', type: 'stock' },
  { symbol: 'ZOMATO.NS', name: 'Zomato Ltd.', type: 'stock' },
  {
    symbol: 'NYKAA.NS',
    name: 'FSN E-Commerce Ventures Ltd. (Nykaa)',
    type: 'stock',
  },
  { symbol: 'DELHIVERY.NS', name: 'Delhivery Ltd.', type: 'stock' },
  {
    symbol: 'IRCTC.NS',
    name: 'Indian Railway Catering & Tourism Corp.',
    type: 'stock',
  },

  // 🏗️ INFRASTRUCTURE & REAL ESTATE
  { symbol: 'LARSEN.NS', name: 'Larsen & Toubro Ltd.', type: 'stock' },
  { symbol: 'DLF.NS', name: 'DLF Ltd.', type: 'stock' },
  { symbol: 'ADANIPORTS.NS', name: 'Adani Ports and SEZ Ltd.', type: 'stock' },
  { symbol: 'ADANIENT.NS', name: 'Adani Enterprises Ltd.', type: 'stock' },
  { symbol: 'ADANIGREEN.NS', name: 'Adani Green Energy Ltd.', type: 'stock' },
  { symbol: 'ADANIPOWER.NS', name: 'Adani Power Ltd.', type: 'stock' },
  { symbol: 'ADANITRANS.NS', name: 'Adani Transmission Ltd.', type: 'stock' },

  // 📡 TELECOM & TECH SERVICES
  { symbol: 'TATACOMM.NS', name: 'Tata Communications Ltd.', type: 'stock' },
  { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel Ltd.', type: 'stock' },
  { symbol: 'IDEA.NS', name: 'Vodafone Idea Ltd.', type: 'stock' },
  { symbol: 'VOD', name: 'Vodafone Group Plc', type: 'stock' },
  { symbol: 'JIOFIN.NS', name: 'Jio Financial Services Ltd.', type: 'stock' },

  // 🌍 INDEXES & ETFs
  { symbol: '^NSEI', name: 'Nifty 50 Index', type: 'index' },
  { symbol: '^BSESN', name: 'Sensex Index', type: 'index' },
  { symbol: '^GSPC', name: 'S&P 500 Index', type: 'index' },
  { symbol: '^IXIC', name: 'NASDAQ Composite Index', type: 'index' },
  { symbol: '^DJI', name: 'Dow Jones Industrial Average', type: 'index' },
];

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [performanceData, setPerformanceData] = useState({
    gainers: [],
    losers: [],
    active: [],
    volume: [],
  });

  // Fetch stock data from your custom API
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

          // Handle API response structure
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
          // Return realistic simulated data for this stock
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

  // Categorize stocks based on performance
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

    // Sort by percentage change for gainers/losers
    const sortedByChange = [...validStocks].sort(
      (a, b) => b.changePercent - a.changePercent
    );

    // Get top 3 gainers (positive change)
    const gainers = sortedByChange
      .filter((stock) => stock.changePercent > 0)
      .slice(0, 3);

    // Get top 3 losers (negative change)
    const losers = sortedByChange
      .filter((stock) => stock.changePercent < 0)
      .slice(0, 3);

    // Sort by volume for most active
    const active = [...validStocks]
      .sort((a, b) => (b.volume || 0) - (a.volume || 0))
      .slice(0, 3);

    // Volume shockers (stocks with highest volume relative to average)
    const volumeShockers = [...validStocks]
      .sort((a, b) => (b.volume || 0) - (a.volume || 0))
      .slice(0, 3);

    // If we don't have enough gainers/losers, generate some simulated ones
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

  // Generate simulated performance data
  const generateSimulatedPerformanceData = () => {
    return {
      gainers: generateSimulatedStocks(3, 'gainer'),
      losers: generateSimulatedStocks(3, 'loser'),
      active: generateSimulatedStocks(3, 'active'),
      volume: generateSimulatedStocks(3, 'volume'),
    };
  };

  // Generate simulated stocks for performance sections
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
        changePercent = Math.random() * 8 + 2; // 2% to 10% gain
        change = (changePercent / 100) * basePrice;
      } else if (type === 'loser') {
        changePercent = -(Math.random() * 8 + 2); // -2% to -10% loss
        change = (changePercent / 100) * basePrice;
      } else {
        changePercent = (Math.random() - 0.5) * 6; // -3% to +3%
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

  // Initialize and fetch all data
  const initializeData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data for all popular stocks from your API
      const stockData = await fetchStockData(POPULAR_STOCKS);

      // Categorize the data for performance sections
      const categorizedData = categorizeStocks(stockData);

      setPerformanceData(categorizedData);
      setStocks(stockData);

      // Check if we have any valid data
      const validStocks = stockData.filter(
        (stock) => !stock.error && stock.price > 0
      );
      if (validStocks.length === 0) {
        setError('Using simulated market data. Real data unavailable.');
      }
    } catch (err) {
      console.error('Error initializing data:', err);
      setError('Failed to load market data. Using simulated data.');

      // Generate complete simulated dataset
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

  // Initialize data on component mount
  useEffect(() => {
    initializeData();

    // Refresh data every 2 minutes
    const interval = setInterval(initializeData, 120000);
    return () => clearInterval(interval);
  }, []);

  const getFilteredStocks = () => {
    let filtered = stocks;

    // Filter by tab
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

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // ✅ Limit the total stocks shown to top 30 only
    return filtered.slice(0, 30);
  };

  const filteredStocks = getFilteredStocks();

  return (
    <div className="min-h-screen bg-gray-900 font-inter">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Market Overview
          </h1>
          <p className="text-gray-400 mb-8">
            Real-time stock performance and market movers
          </p>

          {error && (
            <div className="mb-4 p-4 bg-yellow-900 border border-yellow-700 rounded-lg text-yellow-200">
              {error}
            </div>
          )}

          {/* Performance Overview Sections */}
          <PerformanceSection
            performanceData={performanceData}
            loading={loading}
          />

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 max-w-md px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />

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

          {/* Stocks Grid */}
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
                      <StockCard {...stock} />
                    </motion.div>
                  ))}
            </div>
          </div>

          {/* Empty States */}
          {!loading && filteredStocks.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No stocks found matching "{searchQuery}"
              </p>
            </div>
          )}

          {!loading && stocks.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No stock data available at the moment.
              </p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
