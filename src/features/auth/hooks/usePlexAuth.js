import { useState } from "react";

export const usePlexAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePlexLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/plex/url`
      );
      if (!response.ok) throw new Error("Failed to get Plex OAuth URL");

      const { url } = await response.json();
      if (!url) throw new Error("No OAuth URL returned");
      // Redirect to Plex OAuth
      window.location.href = url;
    } catch (error) {
      // Optionally handle error (e.g., show toast)
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handlePlexLogin,
  };
};
  
