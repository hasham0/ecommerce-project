import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// Create context
export const QueryContext = createContext({
  queries: [],
  setQueries: () => {},
  addQuery: () => {},
  deleteQuery: () => {},
  replyQuery: () => {},
});

// Provider
export default function QueryProvider({ children }) {
  const [queries, setQueries] = useState([]);
  const { user } = useSelector((state) => state.auth);

  // Add query
  const addQuery = async (formQueryData) => {
    const response = await fetch("/api/auth/user-query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formQueryData),
    });
    const result = await response.json();
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }
    return result;
  };

  // Fetch all queries on mount
  const fetchAllQueries = async () => {
    try {
      const response = await fetch("/api/admin/all-queries");
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Something went wrong");
      }
      const result = await response.json();
      setQueries(result.data);
    } catch (error) {
      console.error("❌ Error fetching queries:", error);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchAllQueries();
    }
  }, [user]);

  // Delete query by ID
  const deleteQuery = async (_id) => {
    try {
      const response = await fetch(`/api/admin/delete-query/${_id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Something went wrong");
      }
      const result = await response.json();
      const newQueries = queries.filter((query) => query._id !== _id);
      setQueries(newQueries);
      toast.success(result.message || "Query deleted successfully");
    } catch (error) {
      console.error("❌ Error deleting query:", error);
    }
  };

  // send query to admin
  const replyQuery = async (id, formQueryData) => {
    const response = await fetch(`/api/admin/mail-reply/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formQueryData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }
    const result = await response.json();
    return result;
  };

  return (
    <QueryContext.Provider
      value={{
        queries,
        setQueries,
        addQuery,
        deleteQuery,
        replyQuery,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}

// Custom hook
export const useQueryContext = () => useContext(QueryContext);
