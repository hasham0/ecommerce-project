import { createBrowserRouter } from "react-router";
import AuthProtected from "../context/auth-protected";
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
import Product from "../pages/Product";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProtected>
        <MainLayout />
      </AuthProtected>
    ),
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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/product/:_id",
        element: <Product />,
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
        element: (
          <AuthProtected>
            <AdminLayout />
          </AuthProtected>
        ),
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
            path: "queries",
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
