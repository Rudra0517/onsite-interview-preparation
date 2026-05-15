import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserRoute = ({ children }) => {
  const { role, loading } = useAuth();
  if (loading) return null;
  return role === "User" ? children : <Navigate to="/login" />;
};

export default UserRoute;
