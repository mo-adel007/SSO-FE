import React from 'react';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import LoginForm from '../components/LoginForm';
import LoginSuccess from '../components/LoginSuccess';
import LoadingScreen from '../../../shared/components/LoadingScreen';

const Login = () => {
  const {
    isLoading,
    isInitializing,
    loginSuccess,
    userInfo,
    authToken,
    handleGoogleLogin,
    resetAuth
  } = useGoogleAuth();

  // Show loading spinner while checking for existing authentication
  if (isInitializing) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // Show success screen if login was successful
  if (loginSuccess && userInfo) {
    return (
      <LoginSuccess
        userInfo={userInfo}
        authToken={authToken}
        onReset={resetAuth}
      />
    );
  }

  // Show login form
  return (
    <LoginForm
      onGoogleLogin={handleGoogleLogin}
      isLoading={isLoading}
    />
  );
};

export default Login;
