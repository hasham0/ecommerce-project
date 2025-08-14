import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/cart/cartSlice";
import { useProductContext } from "../context/product-provider";
import ProductCard from "./product-card";

const Products = () => {
  const dispatch = useDispatch();
  const { userProducts } = useProductContext();
  if (userProducts.length === 0) {
    return (
      <section className="mx-auto flex max-w-7xl justify-center px-6 py-8 md:py-14">
        <div className="flex h-64 w-full items-center justify-center rounded-lg border border-dashed border-gray-300 text-center text-2xl text-gray-500 md:text-4xl">
          No products found.
        </div>
      </section>
    );
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-8 md:py-14">
      <h2 className="mb-6 text-2xl font-semibold text-gray-700">
        Trending Products
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {userProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
};
export default Products;
