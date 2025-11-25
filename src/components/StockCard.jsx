const StockCard = ({
  symbol,
  name,
  price,
  change,
  changePercent,
  volume,
  onClick,
}) => {
  const getChangeColor = () => {
    if (changePercent > 0) return 'text-green-400';
    if (changePercent < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getBgColor = () => {
    if (changePercent > 0) return 'bg-green-500/10 border-green-500/20';
    if (changePercent < 0) return 'bg-red-500/10 border-red-500/20';
    return 'bg-gray-800 border-gray-700';
  };

  const getChangeIcon = () => {
    if (changePercent > 0) return '▲';
    if (changePercent < 0) return '▼';
    return '●';
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-xl border ${getBgColor()} hover:scale-[1.02] transition-all cursor-pointer text-left`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white mb-1 truncate">
            {symbol}
          </h3>
          <p className="text-sm text-gray-400 truncate">{name}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">
            ${price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-lg font-semibold ${getChangeColor()}`}>
            {getChangeIcon()} {change > 0 ? '+' : ''}
            {change.toFixed(2)}
          </span>
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            ({changePercent.toFixed(2)}%)
          </span>
        </div>

        {volume && (
          <div className="pt-2 border-t border-gray-700">
            <p className="text-xs text-gray-400">Volume</p>
            <p className="text-sm text-white font-medium">
              {(volume / 1000000).toFixed(2)}M
            </p>
          </div>
        )}
      </div>
    </button>
  );
};

export default StockCard;
