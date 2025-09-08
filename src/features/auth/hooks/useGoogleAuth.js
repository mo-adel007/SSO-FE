import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../../shared/constants';
import toast from 'react-hot-toast';

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
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
        try {
          // Get the temporarily stored user info and token
          const tempUserInfo = localStorage.getItem('tempUserInfo');
          const token = localStorage.getItem('authToken');
          
          if (tempUserInfo && token) {
            const userData = JSON.parse(tempUserInfo);
            setAuthToken(token);
            setUserInfo(userData);
            setLoginSuccess(true);
            
            // Clean up temporary storage
            localStorage.removeItem('tempUserInfo');
            
            // Clean up the URL
            window.history.replaceState({}, document.title, '/');
          }
        } catch (error) {
          console.error('Error processing OAuth callback:', error);
          toast.error('Failed to process authentication');
          localStorage.removeItem('tempUserInfo');
          localStorage.removeItem('authToken');
        }
        setIsInitializing(false);
        return;
      }

      // Check for existing token in localStorage (returning user)
      const existingToken = localStorage.getItem('authToken');
      if (existingToken) {
        try {
          // Verify token with backend
          const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${existingToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setAuthToken(existingToken);
            setUserInfo(userData);
            setLoginSuccess(true);
            toast.success('Welcome back!');
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('Auth verification error:', error);
          localStorage.removeItem('authToken');
        }
      }
      
      setIsInitializing(false);
    };

    checkExistingAuth();
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Get Google OAuth URL from backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}${API_ENDPOINTS.AUTH.GOOGLE}`);
      
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
    setUserInfo(null);
    setAuthToken(null);
    setIsLoading(false);
    setIsInitializing(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('tempUserInfo');
  };

  return {
    isLoading,
    isInitializing,
    loginSuccess,
    userInfo,
    authToken,
    handleGoogleLogin,
    resetAuth
  };
};
