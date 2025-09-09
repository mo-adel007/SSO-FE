import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
  // Remove userInfo state
  const [authToken, setAuthToken] = useState(null);

  // Check for existing auth token and OAuth callback when component mounts
  useEffect(() => {
    const checkExistingAuth = async () => {
      // First check for login success flag from OAuth callback
      const urlParams = new URLSearchParams(window.location.search);
      const loginSuccessFlag = urlParams.get('loginSuccess');
      const error = urlParams.get('error');
      
      // Handle authentication error
      if (error) {
        const errorMessage = urlParams.get('message') || 'Authentication failed';
        toast.error(decodeURIComponent(errorMessage));
        // Clean up the URL
        window.history.replaceState({}, document.title, '/');
        setIsInitializing(false);
        return;
      }
      
      // Handle successful authentication from OAuth callback
      if (loginSuccessFlag === 'true') {
        const token = localStorage.getItem('token');
        if (token) {
          setAuthToken(token);
          setLoginSuccess(true);
          window.history.replaceState({}, document.title, '/');
        }
        setIsInitializing(false);
        return;
      }

      // Check for existing token in localStorage (returning user)
      const existingToken = localStorage.getItem('token');
      if (existingToken) {
        setAuthToken(existingToken);
        setLoginSuccess(true);
      }
      
      setIsInitializing(false);
    };

    checkExistingAuth();
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Get Google OAuth URL from backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/google/url`);
      
      if (!response.ok) {
        throw new Error("Failed to get Google OAuth URL");
      }
      
      const { url } = await response.json();
      
      if (!url) {
        throw new Error("No OAuth URL returned");
      }
      
      // Redirect to Google OAuth
      window.location.href = url;
    } catch (error) {
      toast.error(error.message || "Failed to start Google login.");
      setIsLoading(false);
    }
  };

  const resetAuth = () => {
    setLoginSuccess(false);
    setAuthToken(null);
    setIsLoading(false);
    setIsInitializing(false);
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  };

  return {
    isLoading,
    isInitializing,
    loginSuccess,
    authToken,
    handleGoogleLogin,
    resetAuth
  };
};
