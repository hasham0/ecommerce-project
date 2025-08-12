import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [userLoginCredentials, setUserLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserLoginCredentials((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoginCredentials),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }
      const result = await response.json();
      toast.success(result.message);
      if (result.user.role === "admin") {
        return navigate("/admin");
      }
      navigate("/");
    } catch (error) {
      console.error("🚀 ~ handleSubmit ~ error:", error);
      toast.error(error.message);
    } finally {
      setUserLoginCredentials({
        email: "",
        password: "",
      });
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-70 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
        >
          <FaTimes />
        </button>
        <h2 className="mb-4 text-center text-lg font-semibold text-green-950 md:text-2xl">
          Login To Continue...
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={userLoginCredentials.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
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
              value={userLoginCredentials.password}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
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
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-green-500 py-2 text-white hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?&nbsp;
          <Link
            to="/register"
            className="text-green-500 hover:text-green-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
