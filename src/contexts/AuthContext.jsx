// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userData = await userAPI.getProfile();
      return userData;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw error;
    }
  };

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('stockup_user');

    if (token && storedUser) {
      try {
        // Fetch fresh user data from backend
        const userData = await fetchUserProfile();
        setUser(userData);
        localStorage.setItem('stockup_user', JSON.stringify(userData));
      } catch (error) {
        console.error('Auth check failed:', error);
        // If profile fetch fails, use stored user data as fallback
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login(email, password);

      const { token, user: userData } = response;

      // Store token and initial user data
      localStorage.setItem('token', token);
      localStorage.setItem('stockup_user', JSON.stringify(userData));

      // Fetch complete user profile
      try {
        const completeUserData = await fetchUserProfile();
        setUser(completeUserData);
        localStorage.setItem('stockup_user', JSON.stringify(completeUserData));
      } catch (error) {
        // If profile fetch fails, use the basic user data from login
        setUser(userData);
      }
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.signup(email, password);

      const { token, user: userData } = response;

      localStorage.setItem('token', token);
      localStorage.setItem('stockup_user', JSON.stringify(userData));

      // Fetch complete user profile after signup
      try {
        const completeUserData = await fetchUserProfile();
        setUser(completeUserData);
        localStorage.setItem('stockup_user', JSON.stringify(completeUserData));
      } catch (error) {
        // If profile fetch fails, use the basic user data from signup
        setUser(userData);
      }
      
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Add the missing updateUserProfile function
  const updateUserProfile = async (profileData) => {
    try {
      const updatedUser = await userAPI.updateProfile(profileData);
      setUser(updatedUser);
      localStorage.setItem('stockup_user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('stockup_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        updateUserProfile, // Add this to the context value
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};