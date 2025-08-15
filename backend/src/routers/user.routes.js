// import router module and create instance
import { Router } from "express";

const router = Router();

// import controllers
import {
  registerUser,
  loginUser,
  userProducts,
  userQuery,
  serachProducts,
} from "../controllers/user.controller.js";

// auth routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// user routes
router.route("/user-products").get(userProducts);
router.route("/user-query").post(userQuery);

// serach routes
router.route("/search").get(serachProducts);

export default router;
