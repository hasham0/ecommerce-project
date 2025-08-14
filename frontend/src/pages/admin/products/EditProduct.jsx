import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useProductContext } from "../../../context/product-provider";

export default function EditProduct() {
  const { products, updateProduct } = useProductContext();
  const { _id } = useParams();
  const navigate = useNavigate();
  const editProduct = products.find((p) => p._id === _id);
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    category: "",
    status: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (editProduct) {
      setProductInfo({
        name: editProduct.productName || "",
        price: editProduct.productPrice || "",
        category: editProduct.productCategory || "",
        status: editProduct.productStatus || "",
      });
      setPreviewImage(editProduct.productImage || null);
      setProductImage(null);
    }
  }, [editProduct]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    setProductImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editProduct) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", productInfo.name);
      formData.append("price", productInfo.price);
      formData.append("category", productInfo.category);
      formData.append("status", productInfo.status);
      if (productImage) {
        formData.append("image", productImage);
      }
      const updated = await updateProduct(_id, formData);
      if (updated) navigate("/admin/products");
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setIsSubmitting(false);
      setPreviewImage(null);
      setProductImage(null);
    }
  };
  if (!editProduct) {
    return (
      <div className="p-10 text-center text-lg text-gray-500">
        Loading or Product not found...
      </div>
    );
  }
  return (
    <div className="flex-1 bg-gray-50 p-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Edit Product</h1>

      <button
        onClick={() => navigate("/admin/products")}
        className="mb-6 flex items-center gap-2 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* Grid layout for two columns */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Form */}
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl bg-white p-6 shadow-md"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={productInfo.name}
              onChange={handleInputChange}
              required
              placeholder="Apple"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={productInfo.price}
              onChange={handleInputChange}
              required
              placeholder="100"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={productInfo.category}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
            >
              <option value="">--Select--</option>
              <option value="Cafe">Cafe</option>
              <option value="Home">Home</option>
              <option value="Toys">Toys</option>
              <option value="Fresh">Fresh</option>
              <option value="Electronics">Electronics</option>
              <option value="Mobile">Mobile</option>
              <option value="Beauty">Beauty</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={productInfo.status}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
            >
              <option value="">--Select--</option>
              <option value="In-Stock">In-Stock</option>
              <option value="Out-Of-Stock">Out-Of-Stock</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              name="productImage"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-4 rounded px-6 py-2 text-white transition hover:rounded-xl ${
                isSubmitting
                  ? "bg-gray-400"
                  : "bg-purple-500 hover:bg-purple-600"
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>

        {/* Right Column - Preview */}
        <div className="flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">Preview</h2>

          <img
            src={
              productImage
                ? URL.createObjectURL(productImage) // Show selected image
                : previewImage
                  ? `/uploads/${previewImage}`
                  : "https://placehold.co/400x300"
            }
            alt="Product Preview"
            className="h-64 w-auto rounded object-cover shadow"
          />

          <p className="mt-4 text-sm text-gray-500">
            {productInfo.name || "Product Name"} —{" "}
            {productInfo.price ? `$${productInfo.price}` : "Price"}
          </p>
          <p className="text-sm text-gray-400">
            {productInfo.category || "Category"}
          </p>
          <span
            className={`mt-1 rounded px-2 py-1 text-xs ${
              productInfo.status === "In-Stock"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {productInfo.status || "Status"}
          </span>
        </div>
      </div>
    </div>
  );
}
