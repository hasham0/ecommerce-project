import { useProductContext } from "../context/product-provider";
import ProductCard from "./product-card";

const Products = () => {
  const { userProducts } = useProductContext();

  return (
    <section className="mx-auto max-w-7xl px-6 py-8 md:py-14">
      <h2 className="mb-6 text-2xl font-semibold text-gray-700">
        Trending Products
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {userProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
