import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
