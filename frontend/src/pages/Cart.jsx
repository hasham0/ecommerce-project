import { FaTimes } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearCart } from "../app/features/cart/cartSlice";
import CartCard from "../components/cart-card";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <h2 className="mb-4 flex items-center justify-center gap-2 text-2xl font-semibold text-green-700">
          <span>Your Cart</span>
          <FaCartArrowDown />
        </h2>

        {/* Product List */}
        <div className="max-h-[50vh] space-y-4 overflow-y-auto pr-2">
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <CartCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}
        </div>

        {/* Total + Checkout */}
        <div className="mt-6 flex items-end justify-between gap-2">
          <button
            onClick={() => dispatch(clearCart())}
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-700"
          >
            Clear Cart
          </button>
          <div className="flex flex-col items-end gap-2">
            <span className="text-lg font-medium text-gray-700">
              Total quantity: {cartTotalQuantity}
            </span>
            <span className="text-lg font-medium text-gray-700">
              Total amount: ${cartTotalAmount}
            </span>
            <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
