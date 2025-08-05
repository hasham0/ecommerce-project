import asyncHandler from "../middlewares/async-handler.middleware.js";
import User from "../models/user.model.js";
import {
  CustomError,
  ValidationError,
} from "../utils/customize-error-message.js";
import { ACCESS_TOKEN, cookieOptions } from "../utils/constant.js";
import hasEmptyFields from "../utils/helpers/hasEmptyFields.js";

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

  response.status(200).json({ message: "User registered successfully" });
});

const loginUser = asyncHandler(async (request, response) => {
  const { email, password, role } = request.body;

  if (hasEmptyFields(email, password)) {
    throw new ValidationError("All fields are required");
  }

  const isUserExists = await User.findOne({ email }).select("+password");
  if (!isUserExists) {
    throw new CustomError("User does not exist with this email", 400);
  }

  const isPasswordMatch = await isUserExists.isPasswordCorrect(password);
  if (!isPasswordMatch || isUserExists.role !== role) {
    throw new CustomError("Invalid credentials", 400);
  }

  const token = await isUserExists.generateAuthToken();

  const userObject = isUserExists.toObject();
  delete userObject.password;

  response
    .status(200)
    .cookie(ACCESS_TOKEN, token, cookieOptions)
    .json({
      message: `Welcome back ${userObject.username}`,
      user: userObject,
    });
});

export { registerUser, loginUser };
