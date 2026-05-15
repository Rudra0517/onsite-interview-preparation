import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRedirect() {
  const { role, loading } = useAuth();

  if (loading) return null;

  if (role === "User") return <Navigate to="user" replace />;
  if (role === "Admin") return <Navigate to="admin" replace />;
  if (role === "Super Admin") return <Navigate to="superadmin" replace />;

  return <Navigate to="/login" replace />;
}

export default RoleRedirect;
