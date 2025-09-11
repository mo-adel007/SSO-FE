import React from "react";
import { Shield } from "lucide-react";

const GoogleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 group-hover:scale-110 transition-transform duration-200"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const PlexRockwellIcon = () => (
  <span className="flex items-center gap-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="h-8 w-8"
    >
      <polygon fill="#C8102E" points="10,1 19,5.5 19,14.5 10,19 1,14.5 1,5.5" />
      <text
        x="50%"
        y="62%"
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        fill="#fff"
        fontFamily="Arial, sans-serif"
      >
        RA
      </text>
    </svg>
  </span>
);

const LoginForm = ({ onGoogleLogin, onPlexLogin, googleLoading, plexLoading }) => {
  return (
    <div className="min-h-screen from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-purple-600 rounded-3xl shadow-lg mb-6 animate-shield-glow">
              <Shield className="w-8 h-8 text-white" />
          </div>
          <img
            src="/logo.png"
            alt="GNS Logo"
            className="mx-auto mb-4 w-30 h-20 object-contain drop-shadow-lg"
            draggable="false"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2 ">
            Welcome to GNS Portal
          </h1>
          <p className="text-gray-600">Sign in with your preferred account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="space-y-4">
            <button
              onClick={onGoogleLogin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-2xl px-6 py-3.5 text-gray-700 font-medium hover:border-gray-400 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {googleLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
              ) : (
                <GoogleIcon />
              )}
              {googleLoading ? "Redirecting to Google..." : "Continue with Google"}
            </button>

            <button
              onClick={onPlexLogin}
              disabled={plexLoading}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-2xl px-6 py-3.5 text-gray-700 font-medium hover:border-gray-400 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {plexLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
              ) : (
                <PlexRockwellIcon />
              )}
              {plexLoading
                ? "Redirecting to Plex..."
                : "Continue with Plex (by Rockwell Automation)"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Protected by industry-standard encryption and security measures
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
