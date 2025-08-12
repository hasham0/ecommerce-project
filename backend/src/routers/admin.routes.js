// import router module and create instance
import { Router } from "express";
const router = Router();

// import controllers
import {
  addProduct,
  allProducts,
  updateProduct,
  deleteProduct,
  allQueries,
  deleteQuery,
  updateQuery,
} from "../controllers/admin.controller.js";

// product routes
router.route("/all-products").get(allProducts);
router.route("/add-product").post(addProduct);
router.route("/update-product/:_id").put(updateProduct);
router.route("/delete-product/:_id").delete(deleteProduct);

// query routes
router.route("/all-queries").get(allQueries);
router.route("/update-query/:_id").put(updateQuery);
router.route("/delete-query/:_id").delete(deleteQuery);

export default router;
