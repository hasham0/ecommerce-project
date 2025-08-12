import { createBrowserRouter } from "react-router";
import AdminLayout from "../layout/AdminLayout";
import MainLayout from "../layout/MainLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminQuery from "../pages/admin/AdminQuery";
import AddProduct from "../pages/admin/products/AddProduct";
import EditProduct from "../pages/admin/products/EditProduct";
import QueryReply from "../pages/admin/query/QueryReply";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/admin",
        Component: AdminLayout,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "edit-product/:_id",
            element: <EditProduct />,
          },
          {
            path: "quries",
            element: <AdminQuery />,
          },
          {
            path: "query-reply/:_id",
            element: <QueryReply />,
          },
        ],
      },
    ],
  },
]);

export default router;
