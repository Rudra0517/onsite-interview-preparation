import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SuperadminRoute = ({ children }) => {
  const { role, loading } = useAuth();

  if (loading) return null;

  return role === "Super Admin" ? children : <Navigate to="/unauthorize" />;
};

export default SuperadminRoute;
