import { NavLink, Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <aside className="w-64 border-r p-4 space-y-2">
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => (isActive ? "font-semibold" : "")}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) => (isActive ? "font-semibold" : "")}
            >
              Users
            </NavLink>
            <NavLink
              to="/admin/products"
              className={({ isActive }) => (isActive ? "font-semibold" : "")}
            >
              Products
            </NavLink>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => (isActive ? "font-semibold" : "")}
            >
              Orders
            </NavLink>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AdminLayout;

