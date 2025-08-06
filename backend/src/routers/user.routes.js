// import router module and create instance
import { Router } from "express";
const router = Router();

// import controllers
import { loginUser, registerUser } from "../controllers/user.controller.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
