import express from "express";
import { loadProducts } from "../controllers/product/index.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const result = await loadProducts();

    return res.status(201).json({
      result,
    });
  } catch (err) {
    console.error(err);
  }
});

export default router;
