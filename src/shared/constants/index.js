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
// Routes

