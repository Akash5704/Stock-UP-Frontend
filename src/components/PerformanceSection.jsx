import PerformanceCard from './PerformanceCard';

const PerformanceSection = ({ performanceData, loading, onStockClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <PerformanceCard
        title="Top Gainers"
        type="gainer"
        icon="📈"
        description="Best performing stocks today"
        stocks={performanceData.gainers}
        onStockClick={onStockClick}
      />
      <PerformanceCard
        title="Top Losers"
        type="loser"
        icon="📉"
        description="Biggest decliners today"
        stocks={performanceData.losers}
        onStockClick={onStockClick}
      />
      <PerformanceCard
        title="Most Active"
        type="active"
        icon="⚡"
        description="Highest trading volume"
        stocks={performanceData.active}
        onStockClick={onStockClick}
      />
      <PerformanceCard
        title="Volume Shockers"
        type="volume"
        icon="🔥"
        description="Unusual volume spikes"
        stocks={performanceData.volume}
        onStockClick={onStockClick}
      />
    </div>
  );
};

export default PerformanceSection;
