import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchData = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchProductData, setSearchProductData] = useState([]);

  // Fetch products with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchProductData([]);
      return;
    }

    const debounce = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/auth/search?searchItems=${encodeURIComponent(searchQuery)}`
        );
        const data = await res.json();
        setSearchProductData(data.data || []);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="fixed top-0 flex w-full max-w-[1400px] items-center gap-2 rounded-lg bg-white p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
        />
        <button
          onClick={() => setSearchQuery(searchQuery.trim())}
          className="rounded-xl bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          <FaSearch />
        </button>
      </div>

      {searchProductData.length > 0 && (
        <div className="fixed top-16 max-h-[50vh] w-full max-w-[1400px] overflow-y-auto rounded-lg bg-white p-4 shadow-lg">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {searchProductData.map((product) => (
              <div
                key={product._id}
                className="flex w-full flex-row items-center justify-between gap-4 p-2 sm:flex-col"
              >
                <img
                  src={`/uploads/${product.productImage}`}
                  alt={product.productName}
                  className="h-16 w-16 rounded-md object-contain"
                />
                <div className="flex flex-col items-end sm:items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.productName.charAt(0).toUpperCase() +
                      product.productName.slice(1)}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Category: {product.productCategory}
                  </p>
                  <p className="mt-1 font-bold text-green-500">
                    Price: ${product.productPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchData;
