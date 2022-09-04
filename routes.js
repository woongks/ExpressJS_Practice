import express from "express";
import productController from "./controller/product.js";

const router = express.Router();

router.get("/", productController);
router.post("/", productController);
export default router;
