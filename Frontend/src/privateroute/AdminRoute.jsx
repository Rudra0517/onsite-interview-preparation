import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { role, loading } = useAuth();

  if (loading) return null;

  return role === "Admin" ? children : <Navigate to="/login" />;
};

export default AdminRoute;
