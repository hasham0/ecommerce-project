import asyncHandler from "../middlewares/async-handler.middleware.js";
import Product from "../models/product.model.js";
import Query from "../models/query.model.js";
import {
  CustomError,
  ValidationError,
} from "../utils/customize-error-message.js";
import hasEmptyFields from "../utils/helpers/hasEmptyFields.js";

// ✅ Fetch All Products
const allProducts = asyncHandler(async (request, response) => {
  const products = await Product.find();

  if (!products.length) {
    throw new CustomError("No products found", 404);
  }

  return response.status(200).json({ data: products });
});

// ✅ Add New Product
const addProduct = asyncHandler(async (request, response) => {
  const { name, price, category } = request.body;

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
  });

  return response
    .status(201)
    .json({ data: product, message: "Product added successfully" });
});

// ✅ Update Product
const updateProduct = asyncHandler(async (request, response) => {
  const { _id } = request.params;

  const { name, price, category, status } = request.body;

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
  const quries = await Query.find();
  return response.status(200).json({ data: quries });
});

// ✅ Update Product
const updateQuery = asyncHandler(async (request, response) => {
  const { _id } = request.params;

  const { status } = request.body;

  if (hasEmptyFields(status)) {
    throw new ValidationError("All fields are required");
  }

  const existingQuery = await Query.findById(_id);
  if (!existingQuery) {
    throw new CustomError("Query does not exist with this ID", 404);
  }

  existingQuery.queryStatus = status;
  await existingQuery.save();

  return response
    .status(200)
    .json({ data: existingQuery, message: "Query updated successfully" });
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
export {
  addProduct,
  allProducts,
  updateProduct,
  deleteProduct,
  allQueries,
  updateQuery,
  deleteQuery,
};
