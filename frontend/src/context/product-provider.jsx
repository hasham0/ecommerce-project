import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const ProductContext = createContext({
  products: [],
  userProducts: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
});
export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      const response = await fetch("/api/admin/all-products");
      if (!response.ok)
        throw new Error(
          (await response.json()).message || "Something went wrong"
        );
      const result = await response.json();
      setProducts(result.data || []);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      toast.error(error.message || "Failed to fetch products");
    }
  };
  // Fetch products for the current user
  const fetchAllUserProducts = async () => {
    try {
      const response = await fetch("/api/auth/user-products");
      if (!response.ok)
        throw new Error(
          (await response.json()).message || "Something went wrong"
        );
      const result = await response.json();
      setUserProducts(result.data || []);
    } catch (error) {
      console.error("❌ Error fetching user products:", error);
      toast.error(error.message || "Failed to fetch products");
    }
  };
  // Add product (update state directly)
  const addProduct = async (formData) => {
    try {
      const response = await fetch("/api/admin/add-product", {
        method: "POST",
        body: formData,
      });
      if (!response.ok)
        throw new Error(
          (await response.json()).message || "Something went wrong"
        );
      const data = await response.json();
      // Update products state instantly
      setProducts((prev) => [...prev, data.data]);
      setUserProducts((prev) => [...prev, data.data]);
      return data;
    } catch (error) {
      console.error("❌ Error adding product:", error);
      toast.error(error.message || "Failed to add product");
      throw error;
    }
  };
  // Update product (update state directly)
  const updateProduct = async (_id, formData) => {
    try {
      const response = await fetch(`/api/admin/update-product/${_id}`, {
        method: "PUT",
        body: formData,
      });
      if (!response.ok)
        throw new Error(
          (await response.json()).message || "Something went wrong"
        );
      const result = await response.json();
      // Update products list instantly
      setProducts((prev) =>
        prev.map((product) => (product._id === _id ? result.data : product))
      );
      // Also update userProducts if it exists
      setUserProducts((prev) =>
        prev.map((product) => (product._id === _id ? result.data : product))
      );
      return true;
    } catch (error) {
      console.error("❌ Error updating product:", error);
      toast.error(error.message || "Failed to update product");
      throw error;
    }
  };
  // Delete product (update state directly)
  const deleteProduct = async (_id) => {
    try {
      const response = await fetch(`/api/admin/delete-product/${_id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error(
          (await response.json()).message || "Something went wrong"
        );
      const result = await response.json();
      toast.success(result.message || "Product deleted successfully");
      // Remove product from state instantly
      setProducts((prev) => prev.filter((product) => product._id !== _id));
      setUserProducts((prev) => prev.filter((product) => product._id !== _id));
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      toast.error(error.message || "Failed to delete product");
    }
  };
  // Initial load
  useEffect(() => {
    fetchAllProducts();
    fetchAllUserProducts();
  }, []);
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
export const useProductContext = () => useContext(ProductContext);
