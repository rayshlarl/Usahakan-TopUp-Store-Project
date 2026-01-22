import { getOrder } from "../controllers/orderController.js";
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

export default router;
