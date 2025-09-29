import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../store/userStore";

function AdminRoute() {
  const user = useUserStore((s) => s.user);
  if (!user) return <Navigate to="/user/login" replace />;
  if (!user.isAdmin) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default AdminRoute;
