import { NavLink } from "react-router";

const AdminSidebar = () => {
  return (
    <div className="space-y-6">
      <h2 className="mb-8 text-2xl font-bold text-white">Admin Panel</h2>
      <nav className="space-y-4">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive
              ? "block font-semibold text-green-600"
              : "block text-white hover:text-green-600"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "block font-semibold text-green-600"
              : "block text-white hover:text-green-600"
          }
        >
          Manage Products
        </NavLink>
        <NavLink
          to="/admin/quries"
          className={({ isActive }) =>
            isActive
              ? "block font-semibold text-green-600"
              : "block text-white hover:text-green-600"
          }
        >
          Manage Queries
        </NavLink>
        <NavLink
          to="/"
          className="block text-red-500 underline-offset-3 hover:underline"
        >
          Return to Store
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
