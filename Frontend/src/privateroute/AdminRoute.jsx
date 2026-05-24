import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ROUTES from "../constants/routes";

const AdminRoute = ({ children }) => {
  const { role, loading } = useAuth();

  if (loading) return null;

  return role === "Admin" ? children : <Navigate to={ROUTES.LOGIN} />;
};

export default AdminRoute;
