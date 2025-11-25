// Profile.jsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import {
  User,
  Mail,
  CheckCircle,
  XCircle,
  ShieldCheck,
  DollarSign,
  Calendar,
  Phone,
  MapPin,
  Edit,
  PlusCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  // Initialize form when user data loads
  useEffect(() => {
    if (user) {
      setEditForm({
        firstName: user.profile?.firstName || '',
        lastName: user.profile?.lastName || '',
        phone: user.profile?.phone || '',
        dateOfBirth: user.profile?.dateOfBirth ? 
          new Date(user.profile.dateOfBirth).toISOString().split('T')[0] : '',
        address: {
          street: user.profile?.address?.street || '',
          city: user.profile?.address?.city || '',
          state: user.profile?.address?.state || '',
          zipCode: user.profile?.address?.zipCode || '',
          country: user.profile?.address?.country || ''
        }
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-400">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString();
  };

  const hasProfileData = user.profile && (
    user.profile.firstName ||
    user.profile.lastName ||
    user.profile.phone ||
    user.profile.dateOfBirth ||
    user.profile.address?.street
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Profile</h1>
            <div className="flex gap-4">
              {!hasProfileData && !isEditing && (
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  <PlusCircle className="w-4 h-4" />
                  Setup Profile
                </button>
              )}
              {hasProfileData && (
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              )}
            </div>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white mb-4">Basic Information</h2>
                
                {/* Username */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <User className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Username</p>
                    <p className="text-lg font-semibold text-white">
                      {user.username}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <p className="text-lg font-semibold text-white">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Balance */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-green-500/20">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Account Balance</p>
                    <p className="text-lg font-semibold text-white">
                      ${user.balance?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="pt-6 border-t border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                  {!hasProfileData && !isEditing && (
                    <p className="text-yellow-400 text-sm">
                      Complete your profile to get started
                    </p>
                  )}
                </div>

                {!hasProfileData && !isEditing ? (
                  // Empty state - no profile data
                  <div className="text-center py-8">
                    <User className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-300 mb-2">
                      Profile Not Setup
                    </h4>
                    <p className="text-gray-400 mb-6">
                      Add your personal information to complete your profile
                    </p>
                    <button
                      onClick={handleEditToggle}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
                    >
                      Setup Your Profile
                    </button>
                  </div>
                ) : (
                  // Profile data exists or editing mode
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-purple-500/20">
                        <User className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-400 mb-1">Full Name</p>
                        {isEditing ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editForm.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white w-1/2"
                              placeholder="First Name"
                            />
                            <input
                              type="text"
                              value={editForm.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white w-1/2"
                              placeholder="Last Name"
                            />
                          </div>
                        ) : (
                          <p className="text-lg font-semibold text-white">
                            {user.profile?.firstName && user.profile?.lastName 
                              ? `${user.profile.firstName} ${user.profile.lastName}`
                              : 'Not provided'
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-purple-500/20">
                        <Phone className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-400 mb-1">Phone</p>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white w-full"
                            placeholder="Phone number"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-white">
                            {user.profile?.phone || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-purple-500/20">
                        <Calendar className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-400 mb-1">Date of Birth</p>
                        {isEditing ? (
                          <input
                            type="date"
                            value={editForm.dateOfBirth}
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                          />
                        ) : (
                          <p className="text-lg font-semibold text-white">
                            {formatDate(user.profile?.dateOfBirth)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-purple-500/20">
                        <MapPin className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-400 mb-1">Address</p>
                        {isEditing ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={editForm.address.street}
                              onChange={(e) => handleInputChange('address.street', e.target.value)}
                              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white w-full"
                              placeholder="Street"
                            />
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editForm.address.city}
                                onChange={(e) => handleInputChange('address.city', e.target.value)}
                                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white flex-1"
                                placeholder="City"
                              />
                              <input
                                type="text"
                                value={editForm.address.state}
                                onChange={(e) => handleInputChange('address.state', e.target.value)}
                                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white flex-1"
                                placeholder="State"
                              />
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editForm.address.zipCode}
                                onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white flex-1"
                                placeholder="ZIP Code"
                              />
                              <input
                                type="text"
                                value={editForm.address.country}
                                onChange={(e) => handleInputChange('address.country', e.target.value)}
                                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white flex-1"
                                placeholder="Country"
                              />
                            </div>
                          </div>
                        ) : (
                          <p className="text-lg font-semibold text-white">
                            {user.profile?.address?.street ? 
                              `${user.profile.address.street}, ${user.profile.address.city}, ${user.profile.address.state} ${user.profile.address.zipCode}, ${user.profile.address.country}`
                              : 'Not provided'
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Account Status Section */}
              <div className="pt-6 border-t border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Account Status</h3>
                
                {/* Account Status */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <CheckCircle className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-2">Account Status</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-900/40 text-green-400">
                      Active
                    </span>
                  </div>
                </div>

                {/* KYC Status */}
                <div className="flex items-start gap-4 pt-4">
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <ShieldCheck className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-2">KYC Verification</p>
                    {user.kycVerified ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-900/40 text-green-400">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Verified
                      </span>
                    ) : (
                      <div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-900/40 text-red-400">
                          <XCircle className="w-4 h-4 mr-2" />
                          Not Verified
                        </span>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <button
                            onClick={() => navigate('/kyc')}
                            className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
                          >
                            Complete Your KYC
                          </button>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Save Button for Edit Mode */}
              {isEditing && (
                <div className="pt-6 border-t border-gray-700">
                  <button
                    onClick={handleSaveProfile}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;