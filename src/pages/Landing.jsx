import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// Assuming 'Navbar' uses standard Tailwind classes internally or you'll adjust it separately
import Navbar from '../components/Navbar';

const Landing = () => {
  return (
    // Use a standard dark background with a subtle gradient effect for the "hero" feel
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-20 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl font-extrabold mb-6" // Use 'extrabold' for extra punch
          >
            {/* Replace custom gradient text with a standard bright, attention-grabbing gradient */}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Invest Smarter
            </span>
            <br />
            {/* Use a clear white/light gray for the secondary text */}
            <span className="text-white">with StockUp</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            // Use a light gray for "muted-foreground"
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Track real-time stock prices, analyze market trends, and manage your
            portfolio all in one powerful platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Primary button: Use a noticeable blue gradient and hover shadow */}
            <Link
              to="/signup"
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all 
                         bg-gradient-to-r from-blue-600 to-blue-500 text-white 
                         hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-blue-500/50"
            >
              Get Started Free
            </Link>
            {/* Secondary button: Use a contrasting but less intense gray color */}
            <Link
              to="/login"
              className="px-8 py-4 bg-gray-700 text-white rounded-xl font-semibold text-lg 
                         hover:bg-gray-600 transition-all"
            >
              Sign In
            </Link>
          </motion.div>

          {/* Feature Cards Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Real-Time Data',
                desc: 'Live stock prices and market updates',
              },
              {
                title: 'Advanced Charts',
                desc: 'Professional trading view charts',
              },
              {
                title: 'Portfolio Tracking',
                desc: 'Monitor your investments easily',
              },
            ].map((feature, index) => (
              // Card: Dark background, light border, hover effect
              <div
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 transition-all 
                           hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Landing;
