import { getOrder, createNewOrders } from "../controllers/orderController.js";
import express from "express";

const router = express.Router();

// GET /api/orders - Get all orders
router.get("/orders", async (req, res) => {
  try {
    const response = await getOrder();
    res.json({
      orders: response,
    });
  } catch (err) {
    res.status(500).json({ error: "sugan jol error weh" });
  }
});

// POST /api/orders/create - Create a new order
router.post("/create", async (req, res) => {
  try {
    const result = await createNewOrders(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Gagal membuat pesanan kak :(" });
  }
});

export default router;
