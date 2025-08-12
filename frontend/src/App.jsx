import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import ProductProvider from "./context/product-provider";
import QueryProvider from "./context/query-provider";
import router from "./routes/Routes";

function App() {
  return (
    <>
      <ProductProvider>
        <QueryProvider>
          <RouterProvider router={router} />;
          <Toaster position="top-right" reverseOrder={false} />
        </QueryProvider>
      </ProductProvider>
    </>
  );
}

export default App;
