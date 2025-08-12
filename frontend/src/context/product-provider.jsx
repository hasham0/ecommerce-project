import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Create context
export const ProductContext = createContext({
  products: [],
  userProducts: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
});

// Provider
export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);

  const addProduct = async (productInfo) => {
    const response = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productInfo),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }
    const data = await response.json();
    setProducts((prevProducts) => [...prevProducts, data.data]);
    return data;
  };

  // Fetch all products on mount
  const fetchAllProducts = async () => {
    try {
      const response = await fetch("/api/admin/all-products");
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Something went wrong");
      }

      const result = await response.json();
      setProducts(result.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      toast.error(error.message || "Failed to fetch products");
    }
  };

  // Fetch all user products on mount
  const fetchAllUserProducts = async () => {
    try {
      const response = await fetch("/api/auth/user-products");
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Something went wrong");
      }

      const result = await response.json();
      setUserProducts(result.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      toast.error(error.message || "Failed to fetch products");
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAllProducts();
    fetchAllUserProducts();
  }, []);

  // update product by ID
  const updateProduct = async (_id, data) => {
    try {
      const response = await fetch(`/api/admin/update-product/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Something went wrong");
      }

      const updatedProduct = await response.json();

      // Replace the updated product in the list
      const updatedProducts = products.map((product) =>
        product._id === _id ? updatedProduct.data : product
      );

      setProducts(updatedProducts);
      toast.success("Product updated successfully");
      return true;
    } catch (error) {
      console.error("❌ Error updating product:", error);
      toast.error(error.message || "Failed to update product");
    }
  };

  // Delete product by ID
  const deleteProduct = async (_id) => {
    try {
      const response = await fetch(`/api/admin/delete-product/${_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Something went wrong");
      }

      const result = await response.json();
      const newProducts = products.filter((product) => product._id !== _id);
      setProducts(newProducts);
      toast.success(result.message || "Product deleted successfully");
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      toast.error(error.message || "Failed to delete product");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        userProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook
export const useProductContext = () => useContext(ProductContext);
