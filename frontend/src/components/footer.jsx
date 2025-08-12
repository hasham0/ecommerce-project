import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gradient-to-r from-green-200 to-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-10 text-gray-700 md:grid-cols-2">
        {/* <!-- logo --> */}
        <div className="flex flex-col items-center md:items-start">
          <img src={Logo} alt="E-Commerce Logo" className="mb-3 h-12" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
            possimus!
          </p>
        </div>
        {/* <!-- quick links --> */}
        <div className="grid w-full grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div className="flex flex-col items-center">
            <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
            <ul className="flex flex-col items-center space-y-2 text-sm">
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
            <h3 className="mb-3 text-lg font-semibold">Follow us</h3>
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
      </div>
    </footer>
  );
};
export default Footer;
