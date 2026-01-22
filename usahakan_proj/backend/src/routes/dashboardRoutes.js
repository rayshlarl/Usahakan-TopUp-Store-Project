import express from "express";
import { getTotalCategory } from "../controllers/categoryController.js";
import {
  getTotalProduct,
  getTotalItems,
  getTotalProductSold,
} from "../controllers/product/index.js";

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    const categoryResult = await getTotalCategory();
    const productResult = await getTotalProduct();
    const itemResult = await getTotalItems();
    const totalSold = await getTotalProductSold();

    res.json({
      kategori: categoryResult.rows,
      produk: productResult.rows,
      items: itemResult.rows,
      terjual: totalSold,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
