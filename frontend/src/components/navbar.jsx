import { useEffect, useState } from "react";
import { FaRegUserCircle, FaSearch, FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Close the menu on larger screens
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="z-10 bg-gradient-to-r from-green-200 to-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* <!-- logo --> */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={Logo}
              alt="E-Commerce Logo"
              className="h-12 w-12 rounded-full bg-white object-contain shadow-md"
            />
          </Link>
          {/* <!-- navigation links on medium and large screens --> */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className="font-semibold text-gray-700 hover:text-green-600"
            >
              Home
            </Link>
            <Link to="/login">
              <FaRegUserCircle
                size={20}
                className="text-2xl hover:text-green-600"
              />
            </Link>
            <Link to="/cart">
              <FaShoppingCart
                size={20}
                className="text-2xl hover:text-green-600"
              />
            </Link>
            <Link to="/search">
              <FaSearch size={20} className="text-2xl hover:text-green-600" />
            </Link>
          </div>
          {/* <!-- navigation links on small screens */}
          <div className="relative flex items-center space-x-4 md:hidden">
            <button onClick={toggleMenu}>
              <GiHamburgerMenu size={20} />
            </button>
          </div>
          {/* <!-- mobile menu --> */}
          {isOpen && (
            <div className="absolute top-16 right-0 flex w-full flex-col items-center space-y-2 bg-white px-4 pt-2 pb-4 shadow-md md:hidden">
              <Link className="block text-gray-700 hover:text-green-700">
                Home
              </Link>
              <Link
                to={"/login"}
                className="block text-gray-700 hover:text-green-700"
              >
                Profile
              </Link>
              <Link className="block text-gray-700 hover:text-green-700">
                Cart
              </Link>
              <Link className="block text-gray-700 hover:text-green-700">
                Search
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
