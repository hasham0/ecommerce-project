import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { useDispatch } from "react-redux";
import {
  addToCart,
  deleteFromCart,
  removeFromCart,
  removeProductFromCartData,
} from "../app/features/cart/cartSlice";

const CartCard = ({ product }) => {
  const dispatch = useDispatch();
  const {
    _id,
    productName,
    productCategory,
    productImage,
    productPrice,
    cartQuantity,
  } = product;
  const totalPrice = Number(cartQuantity * productPrice);

  return (
    <div className="relative flex gap-x-6 rounded-lg border border-gray-200 bg-white p-4 shadow transition-all lg:shadow-xl">
      {/* <!-- Image --> */}
      <img
        src={`/uploads/${productImage}` || "https://placehold.co/600x400"}
        alt={productName}
        className="h-32 w-40 rounded-md object-contain"
      />
      {/* <!-- Content --> */}
      <div className="flex w-full flex-col justify-between">
        {/* <!-- Title & Price --> */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{productName}</h3>
          <p className="text-gray-600">Unit Price: {productPrice}</p>
        </div>
        {/* <!-- Quantity Controls --> */}
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => dispatch(removeFromCart({ _id }))}
            className="rounded bg-gray-500 p-2 text-white hover:bg-gray-700"
          >
            <FaMinusCircle />
          </button>
          <span className="min-w-[24px] text-center font-medium">
            {cartQuantity}
          </span>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="rounded bg-gray-500 p-2 text-white hover:bg-gray-700"
          >
            <FaPlusCircle />
          </button>
        </div>
        {/* <!-- Product Category & Total Price --> */}
        <div className="m-1 flex items-center justify-between p-1">
          <div className="flex gap-1">
            <h4 className="text-base font-semibold">Category :</h4>
            <span className="text-base font-bold text-green-600">
              {productCategory}
            </span>
          </div>
          <div className="flex gap-1">
            <h4 className="text-base font-semibold">Total :</h4>
            <span className="text-base font-bold text-gray-600">
              ${totalPrice}
            </span>
          </div>
        </div>
      </div>
      {/* <!-- Remove Button --> */}
      <button
        onClick={() => {
          dispatch(deleteFromCart({ _id }));
          dispatch(
            removeProductFromCartData({
              userId: "689b3593799ed3649bb2d782",
              productId: _id,
            })
          );
        }}
        className="absolute top-3 right-3 rounded bg-red-500 p-2 text-white hover:bg-red-700"
      >
        <ImBin />
      </button>
    </div>
  );
};
export default CartCard;
