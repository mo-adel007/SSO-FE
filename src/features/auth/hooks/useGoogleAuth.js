import { useState } from 'react';

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/google/url`);
      if (!response.ok) throw new Error("Failed to get Google OAuth URL");
      const { url } = await response.json();
      if (!url) throw new Error("No OAuth URL returned");
      window.location.href = url;
    } catch (error) {
      // Optionally handle error (e.g., show toast)
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleGoogleLogin,
  };
};
