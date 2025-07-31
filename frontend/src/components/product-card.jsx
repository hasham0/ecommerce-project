const ProductCard = ({ product }) => {
  return (
    <div
      key={product.id}
      className="rounded-lg bg-white p-4 shadow transition-all hover:shadow-lg"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full rounded-md object-cover"
      />
      <h3 className="mt-3 text-lg font-semibold text-gray-800">
        {product.title}
      </h3>
      <p className="text-gray-600">{product.price}</p>
      <button className="mt-4 w-full rounded bg-purple-600 py-2 text-white hover:bg-purple-700">
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
