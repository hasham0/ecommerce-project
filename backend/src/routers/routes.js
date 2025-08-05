// import controllers
import { loginUser, registerUser } from "../controllers/user.controller.js";

// import router module and create instance
import { Router } from "express";
const router = Router();

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(loginUser);

export default router;
