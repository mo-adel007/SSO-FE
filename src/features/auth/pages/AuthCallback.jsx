import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");
      const error = searchParams.get("error");

      if (error) {
        toast.error(decodeURIComponent(error));
        navigate("/login", { replace: true });
        return;
      }

      if (token) {
        try {
          await login(); // session-based login, context will fetch user
          toast.success("Successfully signed in!");
          navigate("/dashboard", { replace: true });
        } catch (error) {
          console.error("Auth callback error:", error);
          toast.error("Authentication failed");
          navigate("/login", { replace: true });
        }
      } else {
        toast.error("No authentication token received");
        navigate("/login", { replace: true });
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
