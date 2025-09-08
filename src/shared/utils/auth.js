import { USER_ROLES } from '../constants';

// Role-based access helpers
export const hasRole = (user, requiredRole) => {
  return user?.role === requiredRole;
};

export const hasAnyRole = (user, roles) => {
  return roles.includes(user?.role);
};

export const isAdmin = (user) => {
  return hasRole(user, USER_ROLES.ADMIN);
};

export const isOperator = (user) => {
  return hasRole(user, USER_ROLES.OPERATOR);
};

export const isViewer = (user) => {
  return hasRole(user, USER_ROLES.VIEWER);
};

// Token helpers
export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
