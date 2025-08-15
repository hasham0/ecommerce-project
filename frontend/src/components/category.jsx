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

const Category = ({ onSelectCategory }) => {
  const categories = [
    { name: "all", icon: FaShoppingBag },
    { name: "cafe", icon: FaCoffee },
    { name: "home", icon: FaCouch },
    { name: "toys", icon: MdOutlineToys },
    { name: "fresh", icon: FaAppleAlt },
    { name: "electronics", icon: FaLaptopCode },
    { name: "mobile", icon: FaMobileAlt },
    { name: "beauty", icon: GiLipstick },
  ];

  return (
    <div className="mx-auto mt-2 max-w-7xl bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-evenly overflow-x-auto">
          {categories.map((category) => (
            <div
              onClick={() => onSelectCategory(category.name)}
              key={category.name}
              className="flex-shrink-0 p-4 text-center hover:cursor-pointer hover:text-green-700"
            >
              <category.icon className="mx-auto size-5 md:size-6" />
              <span className="mt-2 hidden text-sm font-medium text-gray-900 md:block">
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Category;
