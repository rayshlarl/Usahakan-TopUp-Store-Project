import express from "express";
import { getProductId } from "../controllers/product/index.js";
import {
  loadProductItemsById,
  deleteItemById,
  createItem,
} from "../controllers/product/index.js";
import multer from "multer";

const router = express.Router();

// --> Setup multer seperti biasa
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/icons");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post("/products/item", upload.single("icon"), async (req, res) => {
  try {
    const itemData = JSON.parse(req.body.itemData);
    const iconFile = req.file;

    // --> ambil product id berdasarkan nama
    const productIdResult = await getProductId(itemData.productName);
    const productId = productIdResult.rows[0].id;

    const iconName = iconFile ? iconFile.filename : null;

    // --> Create item to database
    const result = await createItem({ ...itemData, iconName }, productId);

    res.status(201).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
  }
});

router.post("/products/:productName", async (req, res) => {
  const { productName } = req.body;
  // console.log(productName);
  try {
    const productId = await getProductId(productName);
    const productItems = await loadProductItemsById(productId.rows[0].id);
    res.status(201).json({
      data: productItems.rows,
    });
  } catch (err) {
    console.error(err);
  }
});

// --> Delete item by id
router.delete("/products/item/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const result = await deleteItemById(itemId);
    console.log("udah di delete wok");
    res.status(201).json({ result });
  } catch (err) {
    console.error(err);
  }
});

export default router;
