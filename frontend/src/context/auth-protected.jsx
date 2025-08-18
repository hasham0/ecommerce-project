import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

// Restricted routes (outside so they don't re-create every render)
const userRestrictedRoutes = ["/cart", "/contact", "/profile"];
const adminRestrictedRoutes = ["/admin"];

export default function AuthProtected({ children }) {
  const location = useLocation();
  const { user, token } = useSelector((state) => state.auth);

  // 🚫 Protect user routes
  if (!user || !token) {
    if (userRestrictedRoutes.includes(location.pathname)) {
      return <Navigate to="/login" />;
    }
  }
  // 🚫 Protect admin routes
  if (!user || user.role !== "admin" || !token) {
    if (adminRestrictedRoutes.includes(location.pathname)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
