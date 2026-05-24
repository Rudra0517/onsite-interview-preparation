import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ROUTES from "../constants/routes";

const UserRoute = ({ children }) => {
  const { role, loading } = useAuth();
  if (loading) return null;
  return role === "User" ? children : <Navigate to={ROUTES.LOGIN} />;
};

export default UserRoute;
