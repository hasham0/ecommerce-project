import { useState } from "react";
import { useNavigate } from "react-router";

export default function Contact() {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({
    username: "",
    email: "",
    query: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Credentials:", userLoginCredentials);
  };

  return (
    <div className="mx-auto mt-24 max-w-3xl rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-center text-2xl font-bold text-green-500 underline underline-offset-2">
        Query Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Your Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={contactForm.username}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Your Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={contactForm.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="query"
            className="block text-sm font-medium text-gray-700"
          >
            Your Query
          </label>
          <textarea
            type=""
            id="query"
            name="query"
            value={contactForm.query}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-green-500 py-2 text-white hover:bg-green-600"
        >
          Submit Query
        </button>
      </form>
    </div>
  );
}
