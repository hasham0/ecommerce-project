import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useProductContext } from "../../../context/product-provider";

export default function EditProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProductContext();

  const editProduct = products.find((product) => product._id === params._id);

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    category: "",
    status: "",
    image: null,
  });

  useEffect(() => {
    if (editProduct) {
      setProductInfo({
        name: editProduct.productName || "",
        price: editProduct.productPrice || "",
        category: editProduct.productCategory || "",
        status: editProduct.productStatus || "",
        image: null,
      });
    }
  }, [editProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProductInfo((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = updateProduct(params._id, productInfo);
    if (product) {
      navigate("/admin/products");
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
        className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
      >
        <FaArrowLeft />
        Back
      </button>

      <form
        onSubmit={handleSubmit}
        className="mx-auto my-4 max-w-3xl space-y-6 rounded-xl bg-white p-6 shadow-md"
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
            name="image"
            onChange={handleFileChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-4 rounded bg-purple-500 px-6 py-2 text-white transition hover:rounded-xl hover:bg-purple-600"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
