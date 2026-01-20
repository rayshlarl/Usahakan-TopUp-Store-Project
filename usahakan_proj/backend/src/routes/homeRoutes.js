import express from "express";
import { loadCategories } from "../controllers/categoryController.js";
import { loadProducts } from "../controllers/productController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// --> kalo butuh route yang pake autentikasi token pasang ini sebelum async
// --> authenticateToken

// Homepage - show the categories and products
router.get("/", async (req, res) => {
  try {
    const categories = await loadCategories();
    const products = await loadProducts();

    res.json({
      categoryData: categories.rows,
      productsData: products.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
