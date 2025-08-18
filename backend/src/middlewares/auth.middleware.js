import "dotenv/config";
import jwt from "jsonwebtoken";
import asyncHandler from "./async-handler.middleware.js";
import { CustomError } from "../utils/customize-error-message.js";
import User from "../models/user.model.js";
import { ACCESS_TOKEN } from "../utils/constant.js";

const isUserAuthenticated = asyncHandler(async (request, response, next) => {
  const token =
    request.cookies[ACCESS_TOKEN] ||
    request.headers?.authorization?.split(" ")[1];
  if (!token) {
    throw new CustomError("Unauthorized Token", 401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const isUserExist = await User.findById({ _id: decoded._id });
    if (!isUserExist) {
      throw new CustomError("Unauthorized User", 401);
    }
    request.user = isUserExist;
    next();
  } catch (error) {
    next(error);
  }
});

const isUserAuthorizeAdmin = asyncHandler(async (request, response, next) => {
  const {
    user: { _id },
  } = request;
  const user = await User.findOne({ _id: _id }).select({ password: 0 });
  if (!(user && user.role === "admin")) {
    throw new Error("user not authorize as admin");
  }
  next();
});

export { isUserAuthenticated, isUserAuthorizeAdmin };
