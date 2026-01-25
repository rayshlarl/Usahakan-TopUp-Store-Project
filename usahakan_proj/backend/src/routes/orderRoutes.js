import { getOrder, createNewOrders } from "../controllers/orderController.js";
import express from "express";

const router = express.Router();

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

router.post("/cart", async (req, res) => {
  try {
    const result = await createNewOrders(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Gagal membuat pesanan kak :(" });
  }
});

export default router;
