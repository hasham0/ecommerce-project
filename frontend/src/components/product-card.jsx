const ProductCard = ({ product }) => {
  return (
    <div
      key={product.id}
      className="rounded-lg bg-white p-4 shadow transition-all hover:shadow-lg"
    >
      <div
        key={product._id}
        className="rounded-xl bg-white p-4 shadow transition hover:shadow-lg"
      >
        <img
          src={product.image || "https://placehold.co/600x400"}
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
      </div>
      <button className="mt-4 w-full rounded bg-purple-600 py-2 text-white hover:bg-purple-700">
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
