import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ROUTES from "../constants/routes";

function RoleRedirect() {
  const { role, loading } = useAuth();

  if (loading) return null;

  if (role === "User") return <Navigate to="user" replace />;
  if (role === "Admin") return <Navigate to="admin" replace />;
  if (role === "Super Admin") return <Navigate to="superadmin" replace />;

  return <Navigate to={ROUTES.LOGIN} replace />;
}

export default RoleRedirect;
