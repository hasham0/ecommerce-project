import MainLayout from "../layout/MainLayout";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        element: <div>Hello World</div>,
      },
    ],
  },
]);

export default router;
