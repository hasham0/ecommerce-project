import asyncHandler from "../middlewares/async-handler.middleware.js";
import User from "../models/user.model.js";
import {
  CustomError,
  ValidationError,
} from "../utils/customize-error-message.js";
import { ACCESS_TOKEN, cookieOptions } from "../utils/constant.js";
import hasEmptyFields from "../utils/helpers/hasEmptyFields.js";
import Product from "../models/product.model.js";
import Query from "../models/query.model.js";
import checkEmptyData from "../utils/products-length.js";

// ✅ Register User
const registerUser = asyncHandler(async (request, response) => {
  const { username, email, password, phoneNumber } = request.body;
  if (hasEmptyFields(username, email, password, phoneNumber)) {
    throw new ValidationError("All fields are required");
  }
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    throw new CustomError("User already exists with this email", 400);
  }
  await User.create({
    username,
    email,
    password,
    phoneNumber,
    role: "user",
  });
  return response.status(200).json({ message: "User registered successfully" });
});

// ✅ Login User
const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  if (hasEmptyFields(email, password)) {
    throw new ValidationError("All fields are required");
  }
  const isUserExists = await User.findOne({ email }).select("+password");
  if (!isUserExists) {
    throw new CustomError("User does not exist with this email", 400);
  }
  const isPasswordMatch = await isUserExists.isPasswordCorrect(password);
  if (!isPasswordMatch) {
    throw new CustomError("Invalid credentials", 400);
  }
  const token = await isUserExists.generateAuthToken();
  const userObject = isUserExists.toObject();
  delete userObject.password;
  return response
    .status(200)
    .cookie(ACCESS_TOKEN, token, cookieOptions)
    .json({
      message: `Welcome back ${userObject.username}`,
      user: userObject,
    });
});

// ✅ Fetch All User Products that are in stock
const userProducts = asyncHandler(async (request, response) => {
  const products = await Product.find({
    productStatus: "In-Stock",
  });
  if (!products.length) {
    return checkEmptyData(response, products, "No products found");
  }
  return response.status(200).json({ data: products });
});

// ✅ User Query
const userQuery = asyncHandler(async (request, response) => {
  const { username, email, query: queryText } = request.body;
  if (hasEmptyFields(username, email, queryText)) {
    throw new ValidationError("All fields are required");
  }
  const query = await Query.create({
    username,
    email,
    query: queryText,
  });
  return response
    .status(200)
    .json({ data: query, message: "Query submitted successfully" });
});

export { registerUser, loginUser, userProducts, userQuery };
