import React, { useState } from 'react';
import { Shield, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginSuccess = ({ userInfo, authToken, onReset }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleCopyToken = () => {
    navigator.clipboard.writeText(authToken);
    toast.success('Token copied to clipboard!');
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Call the backend logout endpoint
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success('Logged out successfully!');
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still proceed with client-side logout even if backend fails
      toast.success('Logged out successfully!');
    } finally {
      // Remove token from localStorage and reset state
      localStorage.removeItem('authToken');
      onReset();
      setIsLoggingOut(false);
    }
  };

  const handleTryAgain = () => {
    localStorage.removeItem('authToken');
    onReset();
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome, {userInfo.name}!</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-green-500 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">User Information</h3>
              <div className="space-y-2">
                <p className="text-sm"><span className="font-medium">Name:</span> {userInfo.name}</p>
                <p className="text-sm"><span className="font-medium">Email:</span> {userInfo.email}</p>
                <p className="text-sm"><span className="font-medium">User ID:</span> {userInfo.id}</p>
              </div>
            </div>
            
            {authToken && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-700 mb-2">Authentication Token</h3>
                <div className="bg-white rounded border p-3">
                  <code className="text-xs text-gray-800 break-all font-mono">
                    {authToken}
                  </code>
                </div>
                <p className="text-xs text-blue-600 mt-2">This token is stored in localStorage and can be used for API calls</p>
              </div>
            )}
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
