import { FaTimes } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { useNavigate } from "react-router";
import CartCard from "../components/cart-card";

const productList = [
  {
    id: 1,
    image: "https://placehold.co/600x400",
    title: "Product 1",
    price: "$29.99",
  },
  {
    id: 2,
    image: "https://placehold.co/600x400",
    title: "Product 2",
    price: "$39.99",
  },
  {
    id: 3,
    image: "https://placehold.co/600x400",
    title: "Product 3",
    price: "$49.99",
  },
  {
    id: 4,
    image: "https://placehold.co/600x400",
    title: "Product 4",
    price: "$59.99",
  },
  {
    id: 5,
    image: "https://placehold.co/600x400",
    title: "Product 5",
    price: "$69.99",
  },
  {
    id: 6,
    image: "https://placehold.co/600x400",
    title: "Product 6",
    price: "$79.99",
  },
];

export default function Cart() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-70 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
        {/* <!-- Close Button --> */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
        >
          <FaTimes />
        </button>

        {/* <!-- Header --> */}
        <h2 className="mb-4 flex items-center justify-center gap-2 text-2xl font-semibold text-green-700">
          <span>Your Cart</span>
          <FaCartArrowDown />
        </h2>

        {/* <!-- Product List --> */}
        <div className="max-h-[50vh] space-y-4 overflow-y-auto pr-2">
          {productList.map((product) => (
            <CartCard key={product.id} product={product} buttonName="Remove" />
          ))}
        </div>

        {/* <!-- Total + Checkout --> */}
        <div className="mt-6 flex flex-col items-end gap-2">
          <span className="text-lg font-medium text-gray-700">
            Total amount: $327.94
          </span>
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
