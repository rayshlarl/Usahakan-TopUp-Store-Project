import express from "express";
import { loadProducts } from "../controllers/product/index.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// --> kalo butuh route yang pake autentikasi token pasang ini sebelum async
// --> authenticateToken

// Homepage - show the categories and products
router.get("/", async (req, res) => {
  try {
    const result = await loadProducts();

    return res.status(201).json({
      result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
