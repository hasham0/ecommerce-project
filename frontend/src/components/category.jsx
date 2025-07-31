import {
  FaAppleAlt,
  FaCoffee,
  FaCouch,
  FaLaptopCode,
  FaMobileAlt,
  FaShoppingBag,
} from "react-icons/fa";
import { GiLipstick } from "react-icons/gi";
import { MdOutlineToys } from "react-icons/md";

const Category = () => {
  const categories = [
    { name: "All ", icon: FaShoppingBag },
    { name: "Cafe", icon: FaCoffee },
    { name: "Home", icon: FaCouch },
    { name: "Toys", icon: MdOutlineToys },
    { name: "Fresh", icon: FaAppleAlt },
    { name: "Electronics", icon: FaLaptopCode },
    { name: "Mobile", icon: FaMobileAlt },
    { name: "Beauty", icon: GiLipstick },
  ];

  return (
    <div className="mt-2 w-full bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto sm:justify-around lg:justify-between">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex-shrink-0 p-4 text-center hover:cursor-pointer hover:text-green-700"
            >
              <category.icon className="mx-auto size-4 md:size-6" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
