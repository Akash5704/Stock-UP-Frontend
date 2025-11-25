// components/RequireProfileAndKYC.jsx
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, UserX, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const RequireProfileAndKYC = ({ children, action = 'perform this action' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if profile is complete
  const isProfileComplete = () => {
    if (!user?.profile) return false;
    
    const { firstName, lastName, phone, dateOfBirth, address } = user.profile;
    
    return (
      firstName &&
      lastName &&
      phone &&
      dateOfBirth &&
      address?.street &&
      address?.city &&
      address?.state &&
      address?.zipCode &&
      address?.country
    );
  };

  const profileComplete = isProfileComplete();
  const kycVerified = user?.kycVerified;

  // If both conditions are met, render children
  if (profileComplete && kycVerified) {
    return children;
  }

  // Otherwise, show appropriate warning
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700 overflow-hidden">
        <div className="px-8 py-6 bg-yellow-500/10 border-b border-yellow-500/20">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
            <h3 className="text-2xl font-bold text-white">Action Required</h3>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <p className="text-gray-300 text-lg">
            To {action}, you need to complete the following:
          </p>

          <div className="space-y-4">
            {/* Profile Status */}
            <div className={`flex items-start gap-4 p-4 rounded-lg border ${
              profileComplete 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <UserX className={`w-6 h-6 mt-1 ${
                profileComplete ? 'text-green-400' : 'text-red-400'
              }`} />
              <div className="flex-1">
                <h4 className={`font-semibold mb-1 ${
                  profileComplete ? 'text-green-400' : 'text-red-400'
                }`}>
                  {profileComplete ? '✓ Profile Complete' : '✗ Profile Incomplete'}
                </h4>
                <p className="text-gray-400 text-sm">
                  {profileComplete 
                    ? 'Your profile information is complete.' 
                    : 'Complete your personal information including name, phone, date of birth, and address.'}
                </p>
              </div>
            </div>

            {/* KYC Status */}
            <div className={`flex items-start gap-4 p-4 rounded-lg border ${
              kycVerified 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <ShieldAlert className={`w-6 h-6 mt-1 ${
                kycVerified ? 'text-green-400' : 'text-red-400'
              }`} />
              <div className="flex-1">
                <h4 className={`font-semibold mb-1 ${
                  kycVerified ? 'text-green-400' : 'text-red-400'
                }`}>
                  {kycVerified ? '✓ KYC Verified' : '✗ KYC Not Verified'}
                </h4>
                <p className="text-gray-400 text-sm">
                  {kycVerified 
                    ? 'Your identity has been verified.' 
                    : 'Complete KYC verification to start trading stocks.'}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            {!profileComplete && (
              <button
                onClick={() => navigate('/profile')}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
              >
                Complete Your Profile
              </button>
            )}
            
            {profileComplete && !kycVerified && (
              <button
                onClick={() => navigate('/kyc')}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
              >
                Complete KYC Verification
              </button>
            )}

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RequireProfileAndKYC;