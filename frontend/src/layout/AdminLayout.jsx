import { Outlet } from "react-router";
import AdminSlidebar from "../components/admin/admin-slidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gray-800 text-white">
        <div className="h-full overflow-y-auto p-4">
          <AdminSlidebar />
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-10">
        <Outlet />
      </main>
    </div>
  );
}
