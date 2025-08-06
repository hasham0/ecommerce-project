// import router module and create instance
import { Router } from "express";
const router = Router();

// import controllers
import {
  addProduct,
  allProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/admin.controller.js";

router.route("/all-products").get(allProducts);
router.route("/add-product").post(addProduct);
router.route("/update-product/:_id").put(updateProduct);
router.route("/delete-product/:_id").delete(deleteProduct);

export default router;
