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
  mailReply,
} from "../controllers/admin.controller.js";
import upload from "../middlewares/multer.middleware.js";

// product routes
router.route("/all-products").get(allProducts);
router.route("/add-product").post([upload.single("image")], addProduct);
router
  .route("/update-product/:_id")
  .put([upload.single("image")], updateProduct);
router.route("/delete-product/:_id").delete(deleteProduct);

// query routes
router.route("/all-queries").get(allQueries);
router.route("/delete-query/:_id").delete(deleteQuery);

// query reply
router.route("/mail-reply/:_id").post(mailReply);

export default router;
