export default function AdminQuery() {
  const queries = [
    {
      id: 1,
      username: "hasham",
      email: "HashamSaleem75@gmail.com",
      query: "Lorem",
      status: "unread",
    },
  ];
  return (
    <div className="min-h-screen flex-1 bg-gray-50 p-10">
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
          {/* <tbody>
            {queries.map((q, index) => (
              <tr
                key={q.id}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{q.username}</td>
                <td className="px-6 py-4">{q.email}</td>
                <td className="px-6 py-4">{q.query}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      q.status === "unread"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {q.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="rounded-md bg-blue-600 p-1.5 text-white hover:underline">
                    Read
                  </button>
                </td>{" "}
                <td className="px-6 py-4">
                  <button className="rounded-md bg-red-600 p-1.5 text-white hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
  );
}
