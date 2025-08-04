import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";

export default function EditProduct() {
  const params = useParams();
  console.log("🚀 ~ EditProduct ~ params:", params._id);

  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: 0,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Products:");
  };
  return (
    <div className="flex-1 bg-gray-50 p-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Edit Products</h1>
      <button
        onClick={() => navigate("/admin/products")}
        className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
      >
        <FaArrowLeft />
        back
      </button>
      <form
        onSubmit={handleSubmit}
        className="mx-auto my-4 max-w-3xl space-y-6 rounded-xl bg-white p-6 shadow-md"
      >
        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id=""
            name="name"
            value={productInfo.name}
            onChange={handleInputChange}
            placeholder="Apple"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productInfo.price}
            onChange={handleInputChange}
            placeholder="100"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700">
            Categories
          </label>
          <select
            name=""
            id=""
            value={productInfo.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
          >
            <option value={"All"}>--Select--</option>
            <option value={"Cafe"}>Cafe</option>
            <option value={"Home"}>Home</option>
            <option value={"Toys"}>Toys</option>
            <option value={"Fresh"}>Fresh</option>
            <option value={"Electronics"}>Electronics</option>
            <option value={"Mobile"}>Mobile</option>
            <option value={"Beauty"}>Beauty</option>
          </select>
        </div>
        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700">
            Action
          </label>
          <select
            name=""
            id=""
            value={productInfo.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
          >
            <option value={"All"}>--Select--</option>
            <option value={"Cafe"}>In-Stock</option>
            <option value={"Home"}>Out-Of-Stock</option>
          </select>
        </div>
        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            id=""
            name="productImage"
            value={productInfo.name}
            onChange={handleInputChange}
            placeholder="Apple"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-2 shadow-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-4 rounded bg-purple-500 px-6 py-2 text-white transition hover:rounded-xl hover:bg-purple-600"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
