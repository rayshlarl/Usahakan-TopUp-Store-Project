import express from "express";
import { loadInputFields } from "../controllers/product/inputFieldQueries.js";

const router = express.Router();

router.get("/inputTypes", async (req, res) => {
  try {
    const result = await loadInputFields();
    res.status(201).json({ data: result });
  } catch (err) {
    console.error(err);
  }
});

export default router;
