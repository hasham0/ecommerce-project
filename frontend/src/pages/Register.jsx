import { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [userRegisterCredentials, setUserRegisterCredentials] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserRegisterCredentials((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegisterCredentials),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }
      setUserRegisterCredentials({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
      });
      navigate("/login");
    } catch (error) {
      console.error("🚀 ~ handleSubmit ~ error:", error);
      toast.error(error.message);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-80 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <button
          onClick={() => navigate("/")}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
        >
          <FaTimes className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" />
        </button>
        <h2 className="mb-4 text-center text-lg font-semibold text-green-950 md:text-2xl">
          Register Yourself
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userRegisterCredentials.username}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userRegisterCredentials.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              minLength={8}
              maxLength={20}
              value={userRegisterCredentials.password}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-gray-500 hover:text-gray-800"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="phoneNumber"
              id="phoneNumber"
              name="phoneNumber"
              value={userRegisterCredentials.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-green-500 py-2 text-white hover:bg-green-600"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="text-green-500 hover:text-green-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
