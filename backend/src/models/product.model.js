import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      minLength: [3, "please provide atleast 3 characters"],
      maxLength: [50],
      required: [true, "please provide the product name"],
    },
    productPrice: {
      type: String,
      minLength: [2, "please provide atleast 2 characters"],
      maxLength: [8],
      required: [true, "please provide the product price"],
    },
    productCategory: {
      type: String,
      minLength: [2, "please provide atleast 2 characters"],
      maxLength: [20],
      required: [true, "please provide the product category"],
    },
    productStatus: {
      type: String,
      enum: ["In-Stock", "Out-Of-Stock"],
      default: "Out-Of-Stock",
      required: [true, "please provide the product status"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model("Product", productSchema);

export default Product;
