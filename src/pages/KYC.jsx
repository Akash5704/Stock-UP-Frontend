import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Video, ArrowLeft, UserCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const KYC = () => {
  const navigate = useNavigate();
  const { updateKycStatus } = useAuth();

  const handleStartVerification = () => {
    // Simulate KYC verification completion
    setTimeout(() => {
      updateKycStatus(true);
      toast.success('KYC Verification Completed!', {
        description: 'Your account has been successfully verified.',
      });
      navigate('/profile');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-8">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Profile
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              KYC Verification
            </h1>
            <p className="text-gray-600">
              Complete your identity verification through our secure video call
              process
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* User Video */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Video className="w-5 h-5 text-blue-600" />
                    <h2 className="text-gray-900 font-semibold">Your Video</h2>
                  </div>
                  <div className="w-full aspect-video bg-gray-100/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                        <Video className="w-8 h-8 text-blue-600" />
                      </div>
                      <span className="text-gray-500 text-sm">
                        Camera Stream
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* KYC Officer Video */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    <h2 className="text-gray-900 font-semibold">KYC Officer</h2>
                  </div>
                  <div className="w-full aspect-video bg-gray-100/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                        <UserCheck className="w-8 h-8 text-blue-600" />
                      </div>
                      <span className="text-gray-500 text-sm">
                        Officer Stream
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-50/50 rounded-lg p-6 mb-8"
              >
                <h3 className="text-gray-900 font-semibold mb-3">
                  Verification Instructions
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>
                      Ensure you're in a well-lit area with your face clearly
                      visible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>
                      Keep your government-issued ID ready for verification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>
                      Follow the officer's instructions during the verification
                      process
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>The entire process typically takes 5-10 minutes</span>
                  </li>
                </ul>
              </motion.div>

              {/* Start Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center"
              >
                <button
                  onClick={handleStartVerification}
                  className="w-full md:w-auto px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Start Verification
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default KYC;
