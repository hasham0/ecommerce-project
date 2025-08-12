import { useProductContext } from "../../context/product-provider";

export default function AdminDashboard() {
  const { products } = useProductContext();
  return (
    <div className="min-h-screen flex-1 bg-gray-50 p-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <div className="grid w-1/4 grid-cols-1">
        <div className="border-l border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Total Products
          </h2>
          <p className="mt-3 text-3xl font-bold text-green-700">
            {products.length}
          </p>
        </div>
      </div>
    </div>
  );
}
