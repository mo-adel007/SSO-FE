import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");
      const error = searchParams.get("error");

      // Handle authentication error
      if (error) {
        toast.error(decodeURIComponent(error));
        navigate("/", { replace: true });
        return;
      }

      if (token) {
        try {
          // Store the token
          localStorage.setItem("authToken", token);

          // Get user info from the token by calling /auth/me
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();

            // Store user info temporarily to pass to the main page
            localStorage.setItem("tempUserInfo", JSON.stringify(userData));

            toast.success("Successfully logged in with Google!");

            // Navigate to home page with success flag
            navigate("/?loginSuccess=true", { replace: true });
          } else {
            throw new Error("Failed to get user information");
          }
        } catch (error) {
          console.error("Auth callback error:", error);
          toast.error("Authentication failed");
          localStorage.removeItem("authToken");
          navigate("/", { replace: true });
        }
      } else {
        toast.error("No authentication token received");
        navigate("/", { replace: true });
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
