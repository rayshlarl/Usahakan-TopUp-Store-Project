import {
  getOrder,
  createNewOrders,
  updateOrders,
} from "../controllers/orderController.js";
import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// --> Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/paymentsProof");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
//--> multer setup
const upload = multer({ storage });

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

router.post("/cart", upload.single("paymentProof"), async (req, res) => {
  try {
    const orderData = JSON.parse(req.body.orderData);

    if (req.file) {
      orderData.paymentProof = req.file.filename;
    }

    const result = await createNewOrders(orderData);
    res.status(201).json(result);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Gagal membuat pesanan kak :(" });
  }
});

//--> update orders
router.post("/orders", async (req, res) => {
  const { invoiceCode, actions } = req.body;
  console.log(req.body);
  try {
    const result = await updateOrders(invoiceCode, actions);
    res.status(201).json(result);
  } catch (err) {
    console.error("error say:", err);
    res.status(500).json({ error: "gagal update" });
  }
});

export default router;
