import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import ProductProvider from "./context/product-provider";
import router from "./routes/Routes";

function App() {
  return (
    <>
      <ProductProvider>
        <RouterProvider router={router} />;
        <Toaster position="top-right" reverseOrder={false} />
      </ProductProvider>
    </>
  );
}

export default App;
