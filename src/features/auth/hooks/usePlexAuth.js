import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const usePlexAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
    
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = urlParams.get("token");
      const loginSuccess = urlParams.get("loginSuccess");
      const error = urlParams.get("error");

      if (error) {
        const errorMessage =
          urlParams.get("message") || "Authentication failed";
        toast.error(decodeURIComponent(errorMessage));
        window.history.replaceState({}, document.title, "/login");
        setIsInitializing(false);
        return;
      }

      // Handle token from URL (from AuthCallback)
      if (tokenFromUrl) {
        localStorage.setItem("token", tokenFromUrl);
        setAuthToken(tokenFromUrl);
        setLoginSuccess(true);
        window.history.replaceState({}, document.title, "/");
        setIsInitializing(false);
        return;
      }

      // Check existing token (returning user)
      const existingToken = localStorage.getItem("token");
      if (existingToken) {
        setAuthToken(existingToken);
        setLoginSuccess(true);
      }

      setIsInitializing(false);
    };

    checkAuth();
  }, []);

  const handlePlexLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/plex/url`
      );
      if (!response.ok) throw new Error("Failed to get Plex OAuth URL");

      const { url } = await response.json();
      if (!url) throw new Error("No OAuth URL returned");

      window.location.href = url;
    } catch (err) {
      toast.error(err.message || "Failed to start Plex login.");
      setIsLoading(false);
    }
  };

  const resetAuth = () => {
    setLoginSuccess(false);
    setAuthToken(null);
    setIsLoading(false);
    setIsInitializing(false);
  localStorage.removeItem("token");
  };

  return {
    isLoading,
    isInitializing,
    loginSuccess,
    authToken,
    handlePlexLogin,
    resetAuth,
  };
};
