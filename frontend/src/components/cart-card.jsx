import { useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { ImBin } from "react-icons/im";

const CartCard = ({ product, onRemove }) => {
  const [quantity, setQuantity] = useState(1);
  const priceNumber = parseFloat(product.price.replace("$", "")) || 0;
  const totalPrice = (priceNumber * quantity).toFixed(2);
  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1)); // prevent < 1
  return (
    <div className="relative flex gap-x-6 rounded-lg bg-white p-4 shadow transition-all hover:shadow-lg">
      {/* <!-- Image --> */}
      <img
        src={product.image}
        alt={product.title}
        className="h-32 w-40 rounded-md object-cover"
      />
      {/* <!-- Content --> */}
      <div className="flex w-full flex-col justify-between">
        {/* <!-- Title & Price --> */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {product.title}
          </h3>
          <p className="text-gray-600">Unit Price: {product.price}</p>
        </div>
        {/* <!-- Quantity Controls --> */}
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={decreaseQty}
            className="rounded bg-gray-500 p-2 text-white hover:bg-gray-700"
          >
            <FaMinusCircle />
          </button>
          <span className="min-w-[24px] text-center font-medium">
            {quantity}
          </span>
          <button
            onClick={increaseQty}
            className="rounded bg-gray-500 p-2 text-white hover:bg-gray-700"
          >
            <FaPlusCircle />
          </button>
        </div>
        {/* <!-- Total Price --> */}
        <div className="mt-2 flex items-center">
          <h4 className="text-base font-semibold">Total:</h4>
          <span className="ml-2 text-base font-bold text-green-600">
            ${totalPrice}
          </span>
        </div>
      </div>
      {/* <!-- Remove Button --> */}
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 rounded bg-red-500 p-2 text-white hover:bg-red-700"
      >
        <ImBin />
      </button>
    </div>
  );
};
export default CartCard;
