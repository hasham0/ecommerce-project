import Logo from "../assets/logo.png";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:gap-16 md:gap-32 px-6 py-10 text-gray-700 sm:grid-cols-2 md:grid-cols-3">
        {/* <!-- logo --> */}
        <div className="flex flex-col items-center md:items-start">
          <img src={Logo} alt="E-Commerce Logo" className="h-12 mb-3" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
            possimus!
          </p>
        </div>
        {/* <!-- quick links --> */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-x-2 text-sm flex flex-col items-center">
            <li>
              <Link to={"/"} className="hover:text-green-500">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/shop"} className="hover:text-green-500">
                Shop
              </Link>
            </li>
            <li>
              <Link to={"/about"} className="hover:text-green-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="hover:text-green-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* <!-- icons --> */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3">Follow us</h3>
          <div className="flex items-center space-x-2 text-sm">
            <Link className="hover:text-blue-500">
              <FaFacebook />
            </Link>
            <Link className="hover:text-pink-500">
              <FaInstagram />
            </Link>
            <Link className="hover:text-blue-500">
              <FaTwitter />
            </Link>
            <Link className="hover:text-green-500">
              <FaWhatsapp />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
