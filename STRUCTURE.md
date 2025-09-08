# Feature-Based Project Structure

This project follows a feature-based architecture for better maintainability and scalability.

## Structure Overview

```
src/
├── features/           # Feature-specific code
│   ├── auth/          # Authentication feature
│   │   ├── components/
│   │   ├── context/   # Auth context
│   │   ├── pages/     # Login page
│   │   └── index.js   # Feature exports
│   ├── dashboard/     # Dashboard feature
│   │   ├── pages/
│   │   └── index.js
│   ├── admin/         # Admin feature
│   │   ├── components/
│   │   ├── pages/
│   │   └── index.js
│   ├── operator/      # Operator feature
│   │   ├── pages/
│   │   └── index.js
│   └── viewer/        # Viewer feature
│       ├── pages/
│       └── index.js
├── shared/            # Shared/common code
│   ├── components/    # Reusable components
│   ├── utils/         # Utility functions
│   ├── constants/     # App constants
│   └── index.js       # Shared exports
├── assets/            # Static assets
├── App.jsx           # Main App component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Benefits

1. **Feature Isolation**: Each feature is self-contained with its own components, pages, and logic
2. **Scalability**: Easy to add new features without affecting existing ones
3. **Maintainability**: Clear separation of concerns and easier to navigate
4. **Reusability**: Shared components and utilities can be reused across features
5. **Team Collaboration**: Different teams can work on different features independently

## Import Patterns

### Feature Imports
```javascript
// import { AuthProvider, Login } from './features/auth';
// import { Dashboard } from './features/dashboard';
// import { Admin } from './features/admin';
```

### Shared Imports
```javascript
// import { ProtectedRoute, apiClient, USER_ROLES } from './shared';
```

## Adding New Features

1. Create a new folder under `src/features/`
2. Add the necessary subfolders (components, pages, hooks, etc.)
3. Create an `index.js` file to export the feature's public API
4. Update routing in `App.jsx` if needed

## Shared Resources

- **Components**: Reusable UI components (ProtectedRoute, Layout, etc.)
- **Utils**: Helper functions (API client, auth helpers, etc.)
- **Constants**: App-wide constants (routes, roles, API endpoints)
