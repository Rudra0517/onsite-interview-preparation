import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ROUTES from "../constants/routes";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  return isLoggedIn ? children : <Navigate to={ROUTES.LOGIN} replace />;
};

export default PrivateRoute;
