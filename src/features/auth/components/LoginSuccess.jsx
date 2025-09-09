import React, { useState, useEffect } from 'react';
import { Shield, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginSuccess = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  // No token to copy in session/cookie mode
  const handleCopyToken = () => {
    toast('No token available in session mode.');
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      toast.success('Logged out successfully!');
      navigate('/login', { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleTryAgain = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative">
      {/* Floating Logout Button */}
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="fixed top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed z-10"
        title="Logout"
      >
        {isLoggingOut ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <LogOut className="w-5 h-5" />
        )}
      </button>

      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-lg mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Login Successful! 🎉</h1>
          <p className="text-gray-600">You have successfully authenticated with Google</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome, {user?.name || "Unknown"}!</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-green-500 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">User Information</h3>
              <div className="space-y-2">
                <p className="text-sm"><span className="font-medium">Name:</span> {user?.name || "Unknown"}</p>
                <p className="text-sm"><span className="font-medium">Email:</span> {user?.email || "N/A"}</p>
                <p className="text-sm"><span className="font-medium">User ID:</span> {user?.id || "N/A"}</p>
              </div>
            </div>
            
            {/* No token display in session/cookie mode */}
          </div>
          
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={handleCopyToken}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-2xl hover:bg-gray-200 transition-all duration-300"
              >
                Copy Token
              </button>
              <button
                onClick={handleTryAgain}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 px-6 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
              >
                Try Another Login
              </button>
            </div>
            
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium py-3 px-6 rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Logging out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSuccess;
