// components/Signup.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Validation functions
  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) return 'Password must contain at least one symbol';
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  };

  // Real-time validation on field change
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    let error = '';
    switch (field) {
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'password':
        error = validatePassword(formData.password);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(formData.confirmPassword, formData.password);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Real-time confirm password validation when password changes
    if (field === 'password' && touched.confirmPassword) {
      const confirmError = validateConfirmPassword(formData.confirmPassword, value);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const validateForm = () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmError = validateConfirmPassword(formData.confirmPassword, formData.password);

    const newErrors = {
      email: emailError,
      password: passwordError,
      confirmPassword: confirmError,
      general: ''
    };

    setErrors(newErrors);
    setTouched({
      email: true,
      password: true,
      confirmPassword: true
    });

    return !emailError && !passwordError && !confirmError;
  };

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(prev => ({ ...prev, general: '' }));
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await signup(formData.email, formData.password);
      // Navigation will be handled by the useEffect above
    } catch (err) {
      setErrors(prev => ({ 
        ...prev, 
        general: err.message || 'Registration failed. Try a different email.' 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 font-inter">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-2">
              Create account
            </h2>
            <p className="text-gray-400 mb-8">Start your investment journey</p>

            {errors.general && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-900/30 border border-red-500 text-red-400 rounded-lg p-3 mb-4"
              >
                {errors.general}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                             ${errors.email && touched.email ? 'border-red-500' : 'border-gray-700'}`}
                  placeholder="john@example.com"
                  required
                />
                {errors.email && touched.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                             ${errors.password && touched.password ? 'border-red-500' : 'border-gray-700'}`}
                  placeholder="••••••••"
                  required
                />
                {errors.password && touched.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
                <div className="mt-2 text-xs text-gray-400">
                  <p>Password must contain:</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li className={formData.password.length >= 8 ? 'text-green-400' : ''}>
                      At least 8 characters
                    </li>
                    <li className={/(?=.*[a-z])/.test(formData.password) ? 'text-green-400' : ''}>
                      One lowercase letter
                    </li>
                    <li className={/(?=.*[A-Z])/.test(formData.password) ? 'text-green-400' : ''}>
                      One uppercase letter
                    </li>
                    <li className={/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.password) ? 'text-green-400' : ''}>
                      One symbol
                    </li>
                  </ul>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                             ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-700'}`}
                  placeholder="••••••••"
                  required
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
                {formData.confirmPassword && !errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 text-sm mt-1"
                  >
                    ✓ Passwords match
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-lg font-semibold transition-all
                           ${
                             isLoading
                               ? 'bg-gray-600 cursor-not-allowed'
                               : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md hover:shadow-blue-500/50'
                           } text-white`}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;