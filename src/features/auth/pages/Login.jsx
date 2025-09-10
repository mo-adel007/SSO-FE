
import { useAuth } from '../hooks/useAuth';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { usePlexAuth } from '../hooks/usePlexAuth';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../../shared/components/LoadingScreen';

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const googleAuth = useGoogleAuth();
  const plexAuth = usePlexAuth();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [plexLoading, setPlexLoading] = useState(false);

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // If already authenticated, don't show login form (will redirect above)
  if (user) {
    return <LoadingScreen message="Redirecting..." />;
  }

  // Button click handlers to manage individual loading states
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await googleAuth.handleGoogleLogin();
    } finally {
      setGoogleLoading(false);
    }
  };

  const handlePlexLogin = async () => {
    setPlexLoading(true);
    try {
      await plexAuth.handlePlexLogin();
    } finally {
      setPlexLoading(false);
    }
  };

  return (
    <LoginForm
      onGoogleLogin={handleGoogleLogin}
      onPlexLogin={handlePlexLogin}
      googleLoading={googleLoading}
      plexLoading={plexLoading}
    />
  );
};

export default Login;
