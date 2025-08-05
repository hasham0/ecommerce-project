import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import router from "./routes/Routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />;
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
