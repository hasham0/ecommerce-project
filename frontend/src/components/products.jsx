import ProductCard from "./product-card";

const Products = () => {
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
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <h2 className="mb-6 text-2xl font-semibold text-gray-700">
        Trending Products
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
