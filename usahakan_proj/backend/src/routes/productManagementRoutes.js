import express from "express";
import multer from "multer";
import { getCategoryId } from "../controllers/categoryController.js";
import { createProduct } from "../controllers/product/productQueries.js";
import { getInputTypesId } from "../controllers/product/inputFieldQueries.js";

const router = express.Router();

// --> Setup multer again and again
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/thumbnails");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post("/products", upload.single("thumbnails"), async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const productFile = req.file;

    //Ambil id category dari nama cat buat relation
    const getCatId = await getCategoryId(productData.category);
    const catId = getCatId.data.id;

    // Ambil input_types id dari nama
    const inputId = await getInputTypesId(productData.inputStyle);

    const thumbnailFileName = productFile ? productFile.filename : null;

    //fetch push data
    const result = await createProduct(
      { ...productData, thumbnailFileName },
      catId,
      inputId.id
    );
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
  }
});

export default router;
