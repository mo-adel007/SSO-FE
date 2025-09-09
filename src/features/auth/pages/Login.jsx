import { useAuth } from '../hooks/useAuth';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { usePlexAuth } from '../hooks/usePlexAuth';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingScreen from '../../../shared/components/LoadingScreen';

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const googleAuth = useGoogleAuth();
  const plexAuth = usePlexAuth();

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [loading, user, navigate]);

  // Check if either auth method is initializing
  if (loading || googleAuth.isInitializing || plexAuth.isInitializing) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // If already authenticated, don't show login form (will redirect above)
  if (user) {
    return <LoadingScreen message="Redirecting..." />;
  }

  const isLoading = googleAuth.isLoading || plexAuth.isLoading;

  // Show login form
  return (
    <LoginForm
      onGoogleLogin={googleAuth.handleGoogleLogin}
      onPlexLogin={plexAuth.handlePlexLogin}
      isLoading={isLoading}
    />
  );
};

export default Login;
