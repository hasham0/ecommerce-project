import { useCallback, useEffect, useState } from "react";
import {
  FaHome,
  FaRegUserCircle,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";
import { MdContactSupport, MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  logoutUser,
  removeUserDataFromStore,
} from "../app/features/auth/authSlice";
import Logo from "../assets/logo.png";
import SearchData from "./search-data";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, token } = useSelector((state) => state.auth);

  const isUserLoggedIn = user && token;
  const navLinks = [
    { to: "/", icon: <FaHome size={20} />, label: "Home" },
    { to: "/contact", icon: <MdContactSupport size={20} />, label: "Contact" },
    {
      to: isUserLoggedIn ? "/profile" : "/login",
      icon: isUserLoggedIn ? (
        <FaUser size={20} />
      ) : (
        <FaRegUserCircle size={20} />
      ),
      label: isUserLoggedIn ? "Profile" : "Login",
    },
    { to: "/cart", icon: <FaShoppingCart size={20} />, label: "Cart" },
    { to: "/admin", icon: <MdDashboard size={20} />, label: "Dashboard" },
  ];
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (result.payload.success) {
      dispatch(removeUserDataFromStore());
    }
    navigate("/");
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) closeMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeMenu]);

  const checkAdmin = user?.role === "admin";

  return (
    <nav className="z-10 bg-gradient-to-r from-green-200 to-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={Logo}
              alt="E-Commerce Logo"
              className="h-12 w-12 rounded-full bg-white object-contain shadow-md"
            />
          </Link>

          <div className="flex items-center gap-x-4 md:gap-x-6">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="rounded-full p-2 transition hover:bg-gray-100"
            >
              <FaSearch
                size={20}
                className="text-gray-600 hover:text-green-600"
              />
            </button>
            {/* Desktop Links */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navLinks.map(({ to, icon, label }) => {
                if (label === "Dashboard" && !checkAdmin) return null;
                return (
                  <Link
                    key={label}
                    to={to}
                    className="text-gray-700 transition hover:text-green-600"
                    title={label}
                  >
                    {icon}
                  </Link>
                );
              })}
            </div>
            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-x-4 md:hidden">
              <button onClick={toggleMenu}>
                <GiHamburgerMenu size={20} />
              </button>
            </div>
            {/* Logout Button */}
            {isUserLoggedIn && (
              <button
                className="text-gray-700 transition hover:cursor-pointer hover:text-green-600"
                onClick={handleLogout}
              >
                <HiOutlineLogout size={20} />
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="absolute top-16 right-0 flex w-full flex-col items-center space-y-2 bg-white px-4 pt-2 pb-4 shadow-md md:hidden">
              {navLinks.map(({ to, label }) => {
                if (label === "Dashboard" && !checkAdmin) return null;

                return (
                  <Link
                    key={label}
                    to={to}
                    onClick={closeMenu}
                    className="block text-gray-700 hover:text-green-700"
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Search Modal */}
          {isSearchOpen && (
            <SearchData onClose={() => setIsSearchOpen(false)} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
