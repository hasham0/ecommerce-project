import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../app/features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const currentProduct = useSelector((state) =>
    state.cart.cartItems?.find((item) => item._id === product._id)
  );

  const quantity = currentProduct?.cartQuantity ?? 0;

  return (
    <div key={product._id} className="rounded-lg bg-white p-4 transition-all">
      <div className="rounded-xl bg-white p-4 shadow transition hover:shadow-lg">
        <img
          src={
            `/uploads/${product.productImage}` || "https://placehold.co/600x400"
          }
          alt={product.productName}
          className="mb-4 h-40 w-full rounded-md object-cover"
        />
        <div className="flex justify-around">
          <div className="">
            <h3 className="text-center text-xl font-semibold text-gray-700">
              {product.productName}
            </h3>
            <p className="text-sm text-gray-400">
              Category: {product.productCategory}
            </p>
            <p className="mt-1 font-bold text-green-500">
              Price: ${product.productPrice}
            </p>
          </div>

          {currentProduct && quantity > 0 && (
            <div className="mt-2 flex items-center justify-center gap-2">
              <button
                onClick={() => dispatch(removeFromCart(product))}
                className="rounded bg-gray-500 p-2 text-white hover:bg-gray-700"
              >
                <FaMinusCircle />
              </button>

              <span className="min-w-[24px] text-center font-medium">
                {quantity}
              </span>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="rounded bg-gray-500 p-2 text-white hover:bg-gray-700"
              >
                <FaPlusCircle />
              </button>
            </div>
          )}
        </div>
      </div>

      {!quantity && (
        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-4 w-full rounded bg-purple-600 py-2 text-white hover:bg-purple-700"
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
