import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  },
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, cartQuantity: 1 });
      }
      // update totals
      const totals = state.cartItems.reduce(
        (acc, item) => {
          acc.totalAmount += Number(item.productPrice) * item.cartQuantity;
          acc.totalQuantity += item.cartQuantity;
          return acc;
        },
        { totalAmount: 0, totalQuantity: 0 }
      );
      state.cartTotalAmount = totals.totalAmount;
      state.cartTotalQuantity = totals.totalQuantity;
    },
    removeFromCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        if (state.cartItems[itemIndex].cartQuantity === 0) {
          state.cartItems.splice(itemIndex, 1);
        }
      }
      // update totals
      const totals = state.cartItems.reduce(
        (acc, item) => {
          acc.totalAmount += Number(item.productPrice) * item.cartQuantity;
          acc.totalQuantity += item.cartQuantity;
          return acc;
        },
        { totalAmount: 0, totalQuantity: 0 }
      );
      state.cartTotalAmount = totals.totalAmount;
      state.cartTotalQuantity = totals.totalQuantity;
    },

    deleteFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      // update totals
      const totals = state.cartItems.reduce(
        (acc, item) => {
          acc.totalAmount += Number(item.productPrice) * item.cartQuantity;
          acc.totalQuantity += item.cartQuantity;
          return acc;
        },
        { totalAmount: 0, totalQuantity: 0 }
      );
      state.cartTotalAmount = totals.totalAmount;
      state.cartTotalQuantity = totals.totalQuantity;
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
