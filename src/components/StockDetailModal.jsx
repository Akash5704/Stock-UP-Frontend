import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { portfolioAPI } from '../services/api'; // Adjust import path as needed

const TIME_INTERVALS = [
  { label: '1H', value: '1h', period: '1d', interval: '1m' },
  { label: '1D', value: '1d', period: '1d', interval: '1m' },
  { label: '1W', value: '1w', period: '5d', interval: '15m' },
  { label: '1M', value: '1mo', period: '1mo', interval: '1d' },
  { label: '3M', value: '3mo', period: '3mo', interval: '1d' },
  { label: '6M', value: '6mo', period: '6mo', interval: '1d' },
  { label: '1Y', value: '1y', period: '1y', interval: '1wk' },
  { label: '3Y', value: '3y', period: '3y', interval: '1mo' },
];

const API_BASE = 'https://akash5704-stock-api.hf.space';

const StockDetailModal = ({ stock, onClose }) => {
  const [selectedInterval, setSelectedInterval] = useState('1d');
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shares, setShares] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [currentStockData, setCurrentStockData] = useState(stock);
  const [buyLoading, setBuyLoading] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);

  // Fetch current stock data if price is missing (for search results)
  useEffect(() => {
    const fetchCurrentStockData = async () => {
      if (stock?.symbol && (!stock.price || stock.price === 0)) {
        try {
          const response = await fetch(
            `${API_BASE}/stock?symbol=${stock.symbol}`
          );
          if (response.ok) {
            const data = await response.json();
            const currentPrice = data.currentPrice || data.price || data.c || 0;
            const previousClose =
              data.previousClose || data.previous_close || currentPrice;
            const change = currentPrice - previousClose;
            const changePercent = previousClose
              ? (change / previousClose) * 100
              : 0;

            setCurrentStockData({
              ...stock,
              price: currentPrice,
              change: change,
              changePercent: changePercent,
              volume: data.volume || 0,
            });
          }
        } catch (err) {
          console.error('Error fetching current stock data:', err);
          // Use fallback data
          const basePrice = Math.random() * 500 + 50;
          const randomChange = (Math.random() - 0.5) * 15;
          const randomChangePercent = (randomChange / basePrice) * 100;

          setCurrentStockData({
            ...stock,
            price: basePrice,
            change: randomChange,
            changePercent: randomChangePercent,
            volume: Math.floor(Math.random() * 50000000) + 10000000,
          });
        }
      } else {
        setCurrentStockData(stock);
      }
    };

    fetchCurrentStockData();
  }, [stock]);

  // Calculate total cost when shares or stock price changes
  useEffect(() => {
    const numShares = parseInt(shares) || 0;
    if (currentStockData?.price && numShares > 0) {
      setTotalCost(numShares * currentStockData.price);
    } else {
      setTotalCost(0);
    }
  }, [shares, currentStockData?.price]);

  const fetchChartData = async (symbol, period, interval) => {
    try {
      setLoading(true);
      setError(null);

      console.log(
        `Fetching chart data for ${symbol} with period=${period}, interval=${interval}`
      );

      const url = `${API_BASE}/history?symbol=${symbol}&period=${period}&interval=${interval}`;
      console.log('API URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('API response:', result);

      // Check if data exists
      if (!result) {
        throw new Error('No data received from API');
      }

      // Use the data array from the response
      let historicalData = [];

      if (result.data && Array.isArray(result.data)) {
        historicalData = result.data;
      } else if (Array.isArray(result)) {
        historicalData = result;
      } else {
        console.warn('Unexpected API response format, using fallback data');
        throw new Error('Unexpected data format from API');
      }

      if (historicalData.length === 0) {
        console.warn('No historical data available from API, using fallback');
        throw new Error('No historical data available');
      }

      // Transform API data to chart format
      const transformedData = historicalData
        .map((item) => {
          return {
            time: formatTimestamp(item.date, interval),
            price: parseFloat(item.close) || 0,
            open: parseFloat(item.open) || 0,
            high: parseFloat(item.high) || 0,
            low: parseFloat(item.low) || 0,
            volume: parseInt(item.volume) || 0,
          };
        })
        .filter((item) => item.price > 0); // Filter out invalid data points

      console.log('Transformed chart data points:', transformedData.length);

      if (transformedData.length === 0) {
        throw new Error('No valid data points after transformation');
      }

      setChartData(transformedData);
    } catch (err) {
      console.error('Error fetching chart data:', err);
      setError(
        `Failed to load real-time data: ${err.message}. Showing simulated data.`
      );
      // Fallback to generated data
      const fallbackData = generateFallbackData(
        selectedInterval,
        currentStockData
      );
      setChartData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackData = (interval, stock) => {
    console.log('Generating fallback data for:', stock.symbol);

    const config = TIME_INTERVALS.find((i) => i.value === interval);
    if (!config) return [];

    const data = [];
    const currentPrice = stock.price || Math.random() * 500 + 50;
    const basePrice = currentPrice * 0.95; // Start from 5% lower
    const volatility = 0.01; // Reduced volatility for more realistic data

    let dataPoints;
    switch (config.value) {
      case '1h':
        dataPoints = 60;
        break;
      case '1d':
        dataPoints = 78;
        break;
      case '1w':
        dataPoints = 28;
        break;
      case '1mo':
        dataPoints = 30;
        break;
      case '3mo':
        dataPoints = 90;
        break;
      case '6mo':
        dataPoints = 180;
        break;
      case '1y':
        dataPoints = 52;
        break;
      case '3y':
        dataPoints = 36;
        break;
      default:
        dataPoints = 30;
    }

    // Create a realistic price trend based on the stock's actual change
    const trend = (stock.changePercent || 0) / 100;
    let price = basePrice;

    for (let i = dataPoints; i >= 0; i--) {
      // Add random noise and trend
      const randomChange = (Math.random() - 0.5) * volatility * price;
      const trendEffect = (trend / dataPoints) * price * i;
      price = basePrice + trendEffect + randomChange;

      // Ensure price doesn't go negative
      price = Math.max(price, 0.01);

      let timestamp;
      const now = new Date();

      switch (config.value) {
        case '1h':
        case '1d':
          timestamp = new Date(now.getTime() - i * 60000).toLocaleTimeString(
            'en-US',
            {
              hour: '2-digit',
              minute: '2-digit',
            }
          );
          break;
        case '1w':
          timestamp = new Date(
            now.getTime() - i * 24 * 60 * 60000
          ).toLocaleDateString('en-US', {
            weekday: 'short',
          });
          break;
        case '1mo':
          timestamp = new Date(
            now.getTime() - i * 24 * 60 * 60000
          ).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });
          break;
        default:
          const date = new Date(now.getTime() - i * 24 * 60 * 60000);
          timestamp = date.toLocaleDateString('en-US', {
            month: 'short',
            year: '2-digit',
          });
      }

      data.push({
        time: timestamp,
        price: parseFloat(price.toFixed(2)),
        open: parseFloat(
          (price * (1 + Math.random() * 0.02 - 0.01)).toFixed(2)
        ),
        high: parseFloat((price * (1 + Math.random() * 0.03)).toFixed(2)),
        low: parseFloat((price * (1 - Math.random() * 0.03)).toFixed(2)),
        volume: Math.floor(Math.random() * 5000000) + 1000000,
      });
    }

    return data;
  };

  const formatTimestamp = (timestamp, interval) => {
    if (!timestamp) return 'N/A';

    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return String(timestamp).split(' ')[0];
      }

      switch (interval) {
        case '1m':
        case '15m':
          return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });
        case '1d':
          return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });
        case '1wk':
          return date.toLocaleDateString('en-US', {
            month: 'short',
            year: '2-digit',
          });
        case '1mo':
          return date.toLocaleDateString('en-US', {
            month: 'short',
            year: '2-digit',
          });
        default:
          return date.toLocaleDateString('en-US');
      }
    } catch (err) {
      console.error('Error formatting timestamp:', timestamp, err);
      return String(timestamp).substring(0, 10);
    }
  };

  useEffect(() => {
    if (currentStockData?.symbol) {
      const intervalConfig = TIME_INTERVALS.find(
        (i) => i.value === selectedInterval
      );
      if (intervalConfig) {
        fetchChartData(
          currentStockData.symbol,
          intervalConfig.period,
          intervalConfig.interval
        );
      }
    }
  }, [selectedInterval, currentStockData]);

  const getChangeColor = () => {
    const changePercent = currentStockData?.changePercent || 0;
    if (changePercent > 0) return 'text-green-400';
    if (changePercent < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getLineColor = () => {
    const changePercent = currentStockData?.changePercent || 0;
    if (changePercent > 0) return '#4ade80';
    if (changePercent < 0) return '#f87171';
    return '#9ca3af';
  };

  const handleBuyClick = async () => {
    const numShares = parseInt(shares);
    
    if (!numShares || numShares <= 0) {
      alert('Please enter a valid number of shares');
      return;
    }

    if (!currentStockData?.price) {
      alert('Stock price not available');
      return;
    }

    setBuyLoading(true);
    try {
      const response = await portfolioAPI.buyStock(
        currentStockData.symbol,
        numShares,
        currentStockData.price
      );

      setBuySuccess(true);
      alert(
        `Successfully bought ${numShares} shares of ${currentStockData.symbol} at $${totalCost.toFixed(2)}`
      );
      
      // Reset form
      setShares('');
      setTotalCost(0);
      
      // Close success message after 3 seconds
      setTimeout(() => {
        setBuySuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error buying stock:', error);
      alert(
        `Failed to buy stock: ${error.message || 'Unknown error occurred'}`
      );
    } finally {
      setBuyLoading(false);
    }
  };

  const handleSharesChange = (e) => {
    const value = e.target.value;
    
    // Allow empty string or numbers
    if (value === '' || /^\d*$/.test(value)) {
      setShares(value);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-gray-400 text-xs mb-1">{data.time}</p>
          <p className="text-white font-semibold">${data.price.toFixed(2)}</p>
          {data.open && data.high && data.low && (
            <div className="mt-2 space-y-1 text-xs">
              <div className="flex justify-between gap-4">
                <span className="text-gray-400">O:</span>
                <span className="text-white">${data.open.toFixed(2)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-400">H:</span>
                <span className="text-green-400">${data.high.toFixed(2)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-400">L:</span>
                <span className="text-red-400">${data.low.toFixed(2)}</span>
              </div>
              {data.volume && (
                <div className="flex justify-between gap-4">
                  <span className="text-gray-400">Vol:</span>
                  <span className="text-white">
                    {(data.volume / 1000000).toFixed(2)}M
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Calculate chart domain with some padding
  const getDomain = () => {
    if (chartData.length === 0) return [0, 100];

    const prices = chartData.map((d) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.05; // 5% padding

    return [min - padding, max + padding];
  };

  const numShares = parseInt(shares) || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex items-start justify-between z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-white">
                {currentStockData?.symbol}
              </h2>
              <span className="px-3 py-1 bg-gray-800 rounded-lg text-sm text-gray-400">
                {currentStockData?.name}
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-white">
                $
                {currentStockData?.price
                  ? currentStockData.price.toFixed(2)
                  : '0.00'}
              </span>
              <span className={`text-xl font-semibold ${getChangeColor()}`}>
                {currentStockData?.change > 0 ? '+' : ''}
                {currentStockData?.change
                  ? currentStockData.change.toFixed(2)
                  : '0.00'}
                (
                {currentStockData?.changePercent
                  ? currentStockData.changePercent.toFixed(2)
                  : '0.00'}
                %)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {buySuccess && (
            <div className="mb-4 p-3 bg-green-900 border border-green-700 rounded-lg text-green-200 text-sm">
              ✅ Successfully purchased {numShares} shares of {currentStockData?.symbol}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-yellow-900 border border-yellow-700 rounded-lg text-yellow-200 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Time Interval Selector - Moved to top below error message */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {TIME_INTERVALS.map((interval) => (
                <button
                  key={interval.value}
                  onClick={() => setSelectedInterval(interval.value)}
                  className={`
                    px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                    border min-w-[50px] text-center
                    ${
                      selectedInterval === interval.value
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white'
                    }
                  `}
                >
                  {interval.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Chart Section */}
            <div className="flex-1">
              {loading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="text-gray-400 animate-pulse">
                    Loading chart data...
                  </div>
                </div>
              ) : chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="time"
                      stroke="#9ca3af"
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      stroke="#9ca3af"
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      domain={getDomain()}
                      tickFormatter={(value) => `$${value.toFixed(0)}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={getLineColor()}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: getLineColor() }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-80 flex items-center justify-center">
                  <div className="text-gray-400">No chart data available</div>
                </div>
              )}
            </div>

            {/* Buy Section */}
            <div className="w-full lg:w-80 bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">
                Buy {currentStockData?.symbol}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Number of Shares
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={shares}
                    onChange={handleSharesChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter number of shares"
                  />
                </div>

                <div className="bg-gray-900 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-gray-400">
                    <span>Price per share:</span>
                    <span>
                      $
                      {currentStockData?.price
                        ? currentStockData.price.toFixed(2)
                        : '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Number of shares:</span>
                    <span>{numShares}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2">
                    <div className="flex justify-between text-lg font-bold text-white">
                      <span>Total Cost:</span>
                      <span>${totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBuyClick}
                  disabled={numShares === 0 || buyLoading}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                    numShares === 0 || buyLoading
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                  }`}
                >
                  {buyLoading ? (
                    'Processing...'
                  ) : numShares === 0 ? (
                    'Enter shares to buy'
                  ) : (
                    `Buy ${numShares} Share${numShares !== 1 ? 's' : ''}`
                  )}
                </button>

                {numShares > 0 && (
                  <div className="text-xs text-gray-400 text-center">
                    Order will be executed at current market price
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Volume</p>
            <p className="text-white font-semibold text-lg">
              {currentStockData?.volume
                ? (currentStockData.volume / 1000000).toFixed(2) + 'M'
                : 'N/A'}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Change</p>
            <p className={`font-semibold text-lg ${getChangeColor()}`}>
              {currentStockData?.change > 0 ? '+' : ''}
              {currentStockData?.change
                ? currentStockData.change.toFixed(2)
                : '0.00'}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Change %</p>
            <p className={`font-semibold text-lg ${getChangeColor()}`}>
              {currentStockData?.changePercent
                ? currentStockData.changePercent.toFixed(2)
                : '0.00'}
              %
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Data Points</p>
            <p className="text-white font-semibold text-lg">
              {chartData.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetailModal;