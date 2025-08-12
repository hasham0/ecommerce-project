import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Create context
export const QueryContext = createContext({
  queries: [],
  addQuery: () => {},
  updateQuery: () => {},
  deleteQuery: () => {},
});

// Provider
export default function QueryProvider({ children }) {
  const [queries, setQueries] = useState([]);

  const addQuery = async (formQueryData) => {
    const response = await fetch("/api/auth/user-query", {
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
    setQueries((prevQueries) => [...prevQueries, result.data]);
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
      toast.error(error.message || "Failed to fetch queries");
    }
  };

  useEffect(() => {
    fetchAllQueries();
    return () => {
      setQueries([]);
    };
  }, []);

  // Update query by ID
  const updateQuery = async (_id, data) => {
    try {
      const response = await fetch(`/api/admin/update-query/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Something went wrong");
      }

      const updatedQuery = await response.json();

      // Replace the updated query in the list
      const updatedQueries = queries.map((query) =>
        query._id === _id ? updatedQuery.data : query
      );

      setQueries(updatedQueries);
      toast.success("Query updated successfully");
      return true;
    } catch (error) {
      console.error("❌ Error updating query:", error);
      toast.error(error.message || "Failed to update query");
    }
  };

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
      toast.error(error.message || "Failed to delete query");
    }
  };

  return (
    <QueryContext.Provider
      value={{ queries, addQuery, updateQuery, deleteQuery }}
    >
      {children}
    </QueryContext.Provider>
  );
}

// Custom hook
export const useQueryContext = () => useContext(QueryContext);
