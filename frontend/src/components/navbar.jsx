import { Link } from "react-router";
import Logo from "../assets/logo.png";
import { FaRegUserCircle, FaShoppingCart, FaSearch } from "react-icons/fa";
const Navbar = () => {
 return (
  <nav className="bg-gradient-to-r from-green-200 to-white shadow-md">
   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
     <div>
      <img
       src={Logo}
       alt="E-Commerce Logo"
       className="h-12 w-12 rounded-full bg-white object-contain shadow-md"
      />
     </div>
     <div className="hidden md:flex md:items-center md:space-x-4">
      <Link to="/" className="font-semibold text-gray-700 hover:text-green-600">
       Home
      </Link>
      <Link to="/profile">
       <FaRegUserCircle size={20} className="text-2xl hover:text-green-600" />
      </Link>
      <Link to="/cart">
       <FaShoppingCart size={20} className="text-2xl hover:text-green-600" />
      </Link>{" "}
      <Link to="/search">
       <FaSearch size={20} className="text-2xl hover:text-green-600" />
      </Link>
     </div>
    </div>
   </div>
  </nav>
 );
};

export default Navbar;
