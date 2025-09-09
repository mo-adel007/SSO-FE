import "./App.css";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, Login, AuthCallback } from "./features/auth";
import LoginSuccess from "./features/auth/components/LoginSuccess";
import { ProtectedRoute } from "./shared";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <LoginSuccess />
              </ProtectedRoute>
            }
          />{" "}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
