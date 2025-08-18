import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { addToCart, removeFromCart } from "../app/features/cart/cartSlice";
import { useProductContext } from "../context/product-provider";

export default function Product() {
  const { _id } = useParams();
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { userProducts } = useProductContext();

  // find product
  const product = userProducts.find((product) => product._id === _id);

  if (!product) {
    return <p className="mt-10 text-center text-gray-500">Product not found</p>;
  }

  // check product quantity in cart
  const currentProduct = cart?.find((item) => item._id === product._id);
  const quantity = currentProduct?.cartQuantity || 0;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6 md:flex-row md:items-start">
      {/* Image Section */}
      <div className="m-2 flex-1">
        <img
          src={
            product.productImage
              ? `/uploads/${product.productImage}`
              : "https://placehold.co/600x400"
          }
          alt={product.productName}
          className="h-72 w-full rounded-lg bg-white object-contain p-2 shadow-md md:h-[400px]"
        />
      </div>

      {/* Product Details Section */}
      <div className="flex flex-1 flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">
          {product.productName.charAt(0).toUpperCase() +
            product.productName.slice(1)}
        </h2>
        <p className="text-gray-500">Category: {product.productCategory}</p>
        <p className="text-xl font-semibold text-green-600">
          Price: ${product.productPrice}
        </p>

        {/* Cart Actions */}
        {currentProduct && quantity > 0 ? (
          <div className="flex items-center gap-3">
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
        ) : (
          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-4 w-full rounded bg-purple-600 py-2 text-white hover:bg-purple-700"
          >
            Add To Cart
          </button>
        )}

        {/* Back to Products Link */}
        <Link
          to="/"
          className="mt-4 flex items-start text-purple-600 hover:underline"
        >
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}
