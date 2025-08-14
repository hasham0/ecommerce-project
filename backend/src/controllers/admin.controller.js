import asyncHandler from "../middlewares/async-handler.middleware.js";
import Product from "../models/product.model.js";
import Query from "../models/query.model.js";
import {
  CustomError,
  ValidationError,
} from "../utils/customize-error-message.js";
import hasEmptyFields from "../utils/helpers/hasEmptyFields.js";
import sendMail from "../utils/helpers/send-mail.js";
import checkEmptyData from "../utils/products-length.js";

// ✅ Fetch All Products
const allProducts = asyncHandler(async (request, response) => {
  const products = await Product.find();
  if (!products.length) {
    return checkEmptyData(response, products, "No products found");
  }
  return response.status(200).json({ data: products });
});

// ✅ Add New Product
const addProduct = asyncHandler(async (request, response) => {
  const { name, price, category } = request.body;
  const productImage = request.file.filename;
  if (hasEmptyFields(name, price, category)) {
    throw new ValidationError("All fields are required");
  }
  const isProductExist = await Product.findOne({ productName: name });
  if (isProductExist) {
    throw new CustomError("Product already exists with this name", 400);
  }
  const product = await Product.create({
    productName: name,
    productPrice: price,
    productCategory: category,
    productImage: productImage,
  });
  return response
    .status(201)
    .json({ data: product, message: "Product added successfully" });
});

// ✅ Update Product
const updateProduct = asyncHandler(async (request, response) => {
  const { _id } = request.params;
  const { name, price, category, status } = request.body;
  let productImage = "";
  if (request.file) {
    productImage = request.file.filename;
  }
  if (hasEmptyFields(_id, name, price, category, status)) {
    throw new ValidationError("All fields are required");
  }
  const existingProduct = await Product.findById(_id);
  if (!existingProduct) {
    throw new CustomError("Product does not exist with this ID", 404);
  }
  existingProduct.productName = name;
  existingProduct.productPrice = price;
  existingProduct.productCategory = category;
  existingProduct.productStatus = status;
  if (productImage) {
    existingProduct.productImage = productImage || existingProduct.productImage;
  }
  await existingProduct.save();
  return response
    .status(200)
    .json({ data: existingProduct, message: "Product updated successfully" });
});

// ✅ Delete Product
const deleteProduct = asyncHandler(async (request, response) => {
  const { _id } = request.params;
  if (hasEmptyFields(_id)) {
    throw new ValidationError("ID is required");
  }
  const isProductExist = await Product.findById(_id);
  if (!isProductExist) {
    throw new CustomError("Product does not exist with this ID", 404);
  }
  await Product.findByIdAndDelete(_id);
  return response.status(200).json({ message: "Product deleted successfully" });
});

// ✅ All Queries
const allQueries = asyncHandler(async (request, response) => {
  const queries = await Query.find();
  return response.status(200).json({ data: queries });
});

// ✅ Delete Query
const deleteQuery = asyncHandler(async (request, response) => {
  const { _id } = request.params;
  if (hasEmptyFields(_id)) {
    throw new ValidationError("ID is required");
  }
  const isQueryExist = await Query.findById(_id);
  if (!isQueryExist) {
    throw new CustomError("Query does not exist with this ID", 404);
  }
  await Query.findByIdAndDelete(_id);
  return response.status(200).json({ message: "Query deleted successfully" });
});

// ✅ mail reply
const mailReply = asyncHandler(async (request, response) => {
  const { _id } = request.params;
  const { to, from, subject, body } = request.body;
  // Validate required fields
  if (hasEmptyFields(_id, to, from, subject, body)) {
    throw new ValidationError("All fields are required");
  }
  // Check if query exists
  const query = await Query.findById(_id);
  if (!query) {
    throw new CustomError("Query does not exist with this ID", 404);
  }
  // Send the email
  await sendMail({ to, from, subject, body });
  // Update query status
  const updatedQuery = await Query.findByIdAndUpdate(
    _id,
    { queryStatus: "Read" },
    { new: true }
  );
  return response.status(200).json({
    data: updatedQuery,
    message: "Mail sent successfully",
  });
});

export {
  addProduct,
  allProducts,
  updateProduct,
  deleteProduct,
  allQueries,
  deleteQuery,
  mailReply,
};
