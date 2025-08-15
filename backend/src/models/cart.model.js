import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
const cartItemSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productStatus: {
      type: String,
      enum: ["In-Stock", "Out-Of-Stock"],
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    cartQuantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { _id: false }
);

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [cartItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Cart = models.Cart || model("Cart", cartSchema);
export default Cart;
