import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useProductContext } from "../../context/product-provider";

export default function AdminProducts() {
  const navigate = useNavigate();
  const { products, deleteProduct } = useProductContext();
  return (
    <div className="flex-1 bg-gray-50 p-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Manage Products</h1>
      <Link to="/admin/add-product">
        <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-800">
          <FaPlus />
          Add Product
        </button>
      </Link>
      <div className="mt-8">
        {products.length === 0 ? (
          <div className="text-md flex h-64 w-full items-center justify-center rounded-lg border border-dashed border-gray-300 text-center text-gray-500 md:text-2xl">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.length >= 1 &&
              products.map((product) => (
                <div
                  key={product._id}
                  className="rounded-xl bg-white p-4 shadow transition hover:shadow-lg"
                >
                  <img
                    src={
                      `/uploads/${product.productImage}` ||
                      "https://placehold.co/600x400"
                    }
                    alt={product.productName}
                    className="mb-4 h-40 w-full rounded-md object-cover"
                  />
                  <h3 className="text-center text-xl font-semibold text-gray-700">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Category: {product.productCategory}
                  </p>
                  <p className="mt-1 font-bold text-green-500">
                    Price: ${product.productPrice}
                  </p>
                  <p className="font-bold">
                    Status:&nbsp;
                    <span
                      className={` ${
                        product.productStatus === "In-Stock"
                          ? "text-green-500"
                          : "text-red-500"
                      } mt-1 font-bold`}
                    >
                      {product.productStatus}
                    </span>
                  </p>
                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-product/${product._id}`)
                      }
                      className="mt-4 flex flex-1 justify-center rounded-lg bg-gray-600 p-2 text-white transition hover:bg-gray-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="mt-4 flex flex-1 justify-center rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
