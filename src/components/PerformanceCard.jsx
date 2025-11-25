const PerformanceCard = ({
  title,
  stocks,
  type,
  icon,
  description,
  onStockClick,
}) => {
  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return '▲';
    if (change < 0) return '▼';
    return '●';
  };

  const formatNumber = (num) => {
    if (typeof num !== 'number' || isNaN(num)) return '0.00';
    return Math.abs(num).toFixed(2);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            {title}
          </h3>
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        </div>
        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
          {stocks.length} stocks
        </span>
      </div>

      <div className="space-y-3">
        {stocks.length > 0 ? (
          stocks.map((stock, index) => (
            <button
              key={`${stock.symbol}-${index}`}
              onClick={() => onStockClick && onStockClick(stock)}
              className="w-full flex items-center justify-between p-3 bg-gray-750 rounded-lg hover:bg-gray-700 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white truncate">
                    {stock.name}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  ${formatNumber(stock.price)}
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`text-sm font-medium ${getChangeColor(
                    stock.changePercent
                  )}`}
                >
                  {getChangeIcon(stock.changePercent)}{' '}
                  {formatNumber(stock.changePercent)}%
                </div>
                <div className={`text-xs ${getChangeColor(stock.change)}`}>
                  {stock.change > 0 ? '+' : ''}
                  {formatNumber(stock.change)}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-400 text-sm">Loading market data...</p>
            <p className="text-gray-500 text-xs mt-1">Please wait</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceCard;
