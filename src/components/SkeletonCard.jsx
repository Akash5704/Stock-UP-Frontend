const SkeletonCard = () => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md animate-pulse h-40">
    <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
    <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
    <div className="flex justify-between">
      <div className="h-4 bg-gray-700 rounded w-1/3"></div>
      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
    </div>
  </div>
);
export default SkeletonCard;
