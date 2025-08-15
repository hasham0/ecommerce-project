import asyncHandler from "../middlewares/async-handler.middleware.js";
import {
  CustomError,
  ValidationError,
} from "../utils/customize-error-message.js";
import hasEmptyFields from "../utils/helpers/hasEmptyFields.js";
import Cart from "../models/cart.model.js";
import checkEmptyData from "../utils/products-length.js";

// ✅ fetch Cart Products
const fetchCartProducts = asyncHandler(async (request, response) => {
  const { _id } = request.params;
  if (hasEmptyFields(_id)) {
    throw new ValidationError("ID is required");
  }
  const cart = await Cart.findOne({ userId: _id });
  if (!cart) {
    return checkEmptyData(response, cart, "No cart products found");
  }
  if (cart.cartItems.length === 0) {
    return checkEmptyData(response, cart, "No cart products found");
  }
  return response.status(200).json({ data: cart });
});

// ✅ Save Cart Products
const saveCartProducts = asyncHandler(async (request, response) => {
  const { userId, cartItems, totalAmount, totalQuantity } = request.body;
  if (hasEmptyFields(userId, totalAmount, totalQuantity)) {
    throw new ValidationError("All fields are required");
  }
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new ValidationError("Cart items cannot be empty");
  }
  const hasEmptyValue = cartItems.some((item) =>
    Object.values(item).some(
      (value) =>
        value === "" ||
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "")
    )
  );
  if (hasEmptyValue) {
    throw new ValidationError("All fields are required in cart items");
  }
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({
      userId,
      cartItems,
      totalAmount,
      totalQuantity,
    });
  } else {
    cart.cartItems = cartItems;
    cart.totalAmount = totalAmount;
    cart.totalQuantity = totalQuantity;
    cart = await cart.save();
  }
  return response.status(200).json({ data: cart });
});

// ✅ Remove Product From Cart
const removeProductFromCart = asyncHandler(async (request, response) => {
  const { _id, _productId } = request.params;
  if (hasEmptyFields(_id, _productId)) {
    throw new ValidationError("User ID and Product ID are required");
  }
  const cart = await Cart.findOne({ userId: _id });
  if (!cart) {
    throw new CustomError("Cart not found", 404);
  }
  const productIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === _productId
  );
  if (productIndex === -1) {
    throw new CustomError("Product not found in cart", 404);
  }
  const removedItem = cart.cartItems[productIndex.toString()];
  cart.totalQuantity -= removedItem.cartQuantity;
  cart.totalAmount -= removedItem.productPrice * removedItem.cartQuantity;
  cart.cartItems.splice(productIndex, 1);
  await cart.save();
  return response.status(200).json({
    data: cart,
  });
});

// ✅ Clear Cart Products
const clearCartProducts = asyncHandler(async (request, response) => {
  const { _id } = request.params;
  if (hasEmptyFields(_id)) {
    throw new ValidationError("ID is required");
  }
  const cart = await Cart.findOne({ userId: _id });
  if (!cart) {
    throw new CustomError("Cart not found", 404);
  }
  await Cart.deleteOne({ userId: _id });
  return response.status(200).json({ data: "Cart cleared successfully" });
});

export {
  fetchCartProducts,
  saveCartProducts,
  removeProductFromCart,
  clearCartProducts,
};
