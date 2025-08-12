import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useQueryContext } from "../../../context/query-provider";

export default function QueryReply() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { queries, replyQuery, setQueries } = useQueryContext();
  const query = queries.find((q) => q._id === _id);
  const [replyFormData, setReplyFormData] = useState({
    to: "",
    from: "",
    subject: "",
    body: "",
  });
  //  set up user provider
  useEffect(() => {
    if (query) {
      setReplyFormData({
        to: query.email || "",
        from: "hashamsaleem75@gmail.com",
        subject: query.query || "",
        body: "",
      });
    }
  }, [query]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReplyFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await replyQuery(_id, replyFormData);
      const updatedQueries = queries.map((query) =>
        query._id === _id ? result.data : query
      );
      setQueries(updatedQueries);
      toast.success(result.message);
      navigate("/admin/queries");
    } catch (error) {
      console.error("🚀 ~ handleSubmit ~ error:", error);
      toast.error(error.message);
    } finally {
      setReplyFormData({
        to: "",
        from: "hashamsaleem75@gmail.com",
        subject: "",
        body: "",
      });
    }
  };
  return (
    <div className="flex-1 bg-gray-50 p-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Query Reply</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto my-4 max-w-3xl space-y-6 rounded-xl bg-white p-6 shadow-md"
      >
        {/* To */}
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
            value={replyFormData.to}
            disabled={true}
            required
            placeholder="mail-to"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
          />
        </div>
        {/* From */}
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
            value={replyFormData.from}
            disabled={true}
            required
            placeholder="mail-from"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
          />
        </div>
        {/* Subject */}
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
            value={replyFormData.subject}
            disabled={true}
            required
            placeholder="subject"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
          />
        </div>
        {/* Body */}
        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700"
          >
            Body
          </label>
          <textarea
            id="body"
            name="body"
            value={replyFormData.body}
            onChange={handleInputChange}
            rows={5}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
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
