import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
