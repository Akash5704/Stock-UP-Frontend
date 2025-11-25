import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log the 404 error for debugging/monitoring
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    // Outer container: Full screen, dark1er background for contrast
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      {/* Inner card/container for the message: white background, shadow, rounded corners */}
      <div className="max-w-md w-full p-10 bg-white rounded-xl shadow-2xl text-center transform transition duration-500 hover:scale-105">
        {/* Large 404 text: Bold, very large, prominent color */}
        <h1 className="mb-4 text-7xl md:text-8xl font-extrabold text-indigo-600 tracking-widest">
          404
        </h1>
        {/* Subtitle/Message: Clear and concise */}
        <p className="mb-6 text-2xl font-semibold text-gray-800 border-t border-b border-gray-200 py-3">
          PAGE NOT FOUND
        </p>
        {/* Path information (optional but helpful for user/debugging) */}
        <p className="mb-8 text-sm text-gray-500 italic truncate">
          The path{' '}
          <strong className="text-red-500">'{location.pathname}'</strong> does
          not exist.
        </p>

        {/* Home link: Button-like styling for a clear call to action */}
        <a
          href="/"
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
