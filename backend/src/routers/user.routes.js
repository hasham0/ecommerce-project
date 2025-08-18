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
  logoutUser,
  deleteAccount,
} from "../controllers/user.controller.js";
import { isUserAuthenticated } from "../middlewares/auth.middleware.js";

// auth routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get([isUserAuthenticated], logoutUser);
router.route("/delete-account").delete([isUserAuthenticated], deleteAccount);
// user routes
router.route("/user-products").get(userProducts);
router.route("/user-query").post([isUserAuthenticated], userQuery);

// serach routes
router.route("/search").get(serachProducts);

export default router;
