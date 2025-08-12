import { useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function QueryReply() {
  const params = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    to: "",
    from: "",
    subject: "",
    body: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex-1 bg-gray-50 p-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Query Reply</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto my-4 max-w-3xl space-y-6 rounded-xl bg-white p-6 shadow-md"
      >
        <div>
          <label
            htmlFor="to"
            className="block text-sm font-medium text-gray-700"
          >
            To
          </label>
          <input
            id="to"
            type="text"
            name="to"
            value={formData.to}
            onChange={handleInputChange}
            required
            placeholder="mail-to"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="from"
            className="block text-sm font-medium text-gray-700"
          >
            From
          </label>
          <input
            id="from"
            type="text"
            name="from"
            value={formData.from}
            onChange={handleInputChange}
            required
            placeholder="mail-from"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            placeholder="subject"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700"
          >
            Body
          </label>
          <textarea
            type=""
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-4 rounded bg-purple-500 px-6 py-2 text-white transition hover:rounded-xl hover:bg-purple-600"
          >
            Reply
          </button>
        </div>
      </form>
    </div>
  );
}
