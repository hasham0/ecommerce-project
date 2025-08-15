import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ==================== ASYNC THUNKS ====================

// ✅ Save cart products in database
export const saveCartData = createAsyncThunk("cart/save", async (cartData) => {
  const response = await fetch("/api/cart/save-cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return (await response.json()) || [];
});

// ✅ Fetch cart products from database
export const fetchCartData = createAsyncThunk("cart/fetch", async (userId) => {
  const response = await fetch(`/api/cart/fetch-cart/${userId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return (await response.json()) || [];
});

// ✅ remove product from cart in database
export const removeProductFromCartData = createAsyncThunk(
  "cart/remove-product",
  async ({ userId, productId }) => {
    const response = await fetch(
      `/api/cart/remove-cart-product/${userId}/${productId}`,
      {
        method: "PATCH",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return (await response.json()) || [];
  }
);
// ✅ Clear cart in database
export const clearCartData = createAsyncThunk("cart/clear", async (userId) => {
  const response = await fetch(`/api/cart/clear-cart/${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return (await response.json()) || [];
});

// ==================== SLICE ====================

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  },
  reducers: {
    // ✅ Add item to cart
    addToCart(state, action) {
      if (!Array.isArray(state.cartItems)) {
        state.cartItems = [];
      }

      const itemIndex = state.cartItems.findIndex(
        (item) => item?._id === action.payload?._id
      );

      if (itemIndex !== -1) {
        // Increase quantity
        state.cartItems[itemIndex].cartQuantity =
          (state.cartItems[itemIndex].cartQuantity || 0) + 1;
      } else {
        // Add new product with quantity 1
        state.cartItems.push({ ...action.payload, cartQuantity: 1 });
      }

      updateCartTotals(state);
    },

    // ✅ Remove single quantity of an item
    removeFromCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item?._id === action.payload?._id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity =
          (state.cartItems[itemIndex].cartQuantity || 0) - 1;

        if (state.cartItems[itemIndex].cartQuantity <= 0) {
          state.cartItems.splice(itemIndex, 1);
        }
      }

      updateCartTotals(state);
    },

    // ✅ Delete item completely
    deleteFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item?._id !== action.payload?._id
      );
      updateCartTotals(state);
    },

    // ✅ Clear cart locally
    clearCart(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCartData.fulfilled, (state, action) => {
      const cartData = action.payload?.data || {};
      state.cartItems = cartData.cartItems || [];
      state.cartTotalQuantity = cartData.totalQuantity || 0;
      state.cartTotalAmount = cartData.totalAmount || 0;
    });

    builder.addCase(saveCartData.fulfilled, (state, action) => {
      const cartData = action.payload?.data || {};
      state.cartItems = cartData.cartItems || [];
      state.cartTotalQuantity = cartData.totalQuantity || 0;
      state.cartTotalAmount = cartData.totalAmount || 0;
    });

    builder.addCase(removeProductFromCartData.fulfilled, (state, action) => {
      const cartData = action.payload?.data || {};
      state.cartItems = cartData.cartItems || [];
      state.cartTotalQuantity = cartData.totalQuantity || 0;
      state.cartTotalAmount = cartData.totalAmount || 0;
    });

    builder.addCase(clearCartData.fulfilled, (state) => {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    });
  },
});

// ==================== HELPERS ====================

// ✅ Helper function to recalculate totals
function updateCartTotals(state) {
  const totals = state.cartItems.reduce(
    (acc, item) => {
      acc.totalAmount +=
        Number(item?.productPrice || 0) * (item?.cartQuantity || 0);
      acc.totalQuantity += item?.cartQuantity || 0;
      return acc;
    },
    { totalAmount: 0, totalQuantity: 0 }
  );

  state.cartTotalAmount = totals.totalAmount;
  state.cartTotalQuantity = totals.totalQuantity;
}

export const { addToCart, removeFromCart, deleteFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
