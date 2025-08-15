// import router module and create instance
import { Router } from "express";
const router = Router();

// import controllers
import {
  fetchCartProducts,
  saveCartProducts,
  clearCartProducts,
  removeProductFromCart,
} from "../controllers/cart.controller.js";

// cart routes
router.route("/fetch-cart/:_id").get(fetchCartProducts);
router.route("/save-cart").post(saveCartProducts);
router
  .route("/remove-cart-product/:_id/:_productId")
  .patch(removeProductFromCart);
router.route("/clear-cart/:_id").delete(clearCartProducts);

export default router;
