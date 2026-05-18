import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // 🔥 Show nothing or loader while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  // 🔥 Redirect if not logged in + preserve where user wanted to go
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}