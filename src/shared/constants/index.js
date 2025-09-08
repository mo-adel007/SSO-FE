// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    ME: '/auth/me',
    GOOGLE: '/auth/google/url',
    PLEX: '/auth/plex/url',
    PLEX_CALLBACK: '/auth/plex/callback',
  },
  ADMIN: {
    USERS: '/admin/users',
    UPDATE_USER_ROLE: (id) => `/admin/users/${id}/role`,
  },
};

// User roles
export const USER_ROLES = {
  ADMIN: 'Admin',
  OPERATOR: 'Operator',
  VIEWER: 'Viewer',
};

// Routes
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  OPERATOR: '/operator',
  VIEWER: '/viewer',
};
