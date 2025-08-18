import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { ACCESS_TOKEN } from "../../../utils/constant";

// ==================== ASYNC THUNKS ====================

// ✅ Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Registration failed");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// ✅ Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userLoginCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userLoginCredentials),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Login failed");
      }

      const result = await response.json();

      // save token in localStorage
      localStorage.setItem(ACCESS_TOKEN, result[ACCESS_TOKEN]);
      toast.success(result.message);

      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "GET",
    });

    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error.message || "logout failed");
    }

    const result = await response.json();
    toast.success(result.message);
    return result;
  } catch (error) {
    return rejectWithValue(error.message || "Something went wrong");
  }
});

// ✅ Delete user (from database)
export const deleteUser = createAsyncThunk(
  "auth/delete",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/auth/delete-account`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Delete failed");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
// ==================== SLICE ====================

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem(ACCESS_TOKEN) || null,
    loading: false,
    error: null,
  },
  reducers: {
    removeUserDataFromStore(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem(ACCESS_TOKEN);
    },
  },

  extraReducers: (builder) => {
    // ===== Register =====
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user || null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ===== Login =====
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user || null;
      state.token = action.payload[ACCESS_TOKEN] || null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ===== Logout =====
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // ===== Delete User =====
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// ==================== HELPERS ====================

export const { removeUserDataFromStore } = authSlice.actions;

export default authSlice.reducer;
