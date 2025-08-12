import { useNavigate } from "react-router";
import { useQueryContext } from "../../context/query-provider";

export default function AdminQuery() {
  const navigate = useNavigate();
  const { queries, deleteQuery } = useQueryContext();
  return (
    <div className="flex-1 bg-gray-50 p-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Admin Queries</h1>
      <div className="relative overflow-x-auto rounded-lg shadow">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-100 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3">S.No</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">User Email</th>
              <th className="px-6 py-3">Query</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
              <th className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {queries.length === 0 ? (
              <tr>
                <td
                  colSpan="100%"
                  className="text-md w-full py-4 text-center md:text-2xl"
                >
                  No Query found.
                </td>
              </tr>
            ) : (
              queries.map((query, index) => (
                <tr
                  key={query._id}
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{query.username}</td>
                  <td className="px-6 py-4">{query.email}</td>
                  <td className="px-6 py-4">{query.query}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-md px-3 py-1 text-xs font-semibold ${
                        query.status === "unread"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {query.queryStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        navigate(`/admin/query-reply/${query._id}`)
                      }
                      className="rounded-md bg-green-600 p-1.5 text-white hover:underline"
                    >
                      Reply
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteQuery(query._id)}
                      className="rounded-md bg-red-600 p-1.5 text-white hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
