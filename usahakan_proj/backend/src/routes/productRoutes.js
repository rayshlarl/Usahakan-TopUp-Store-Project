import express from "express";
import {
  loadProductItemsById,
  getProductIdWithCategory,
  getInputFieldsByProductName,
} from "../controllers/product/index.js";
import multer from "multer";

const router = express.Router();

// Product Detail - Show the product details (Items)
router.get("/:category/:productName", async (req, res) => {
  try {
    const { category, productName } = req.params;

    const productValidationResult = await getProductIdWithCategory(
      productName,
      category
    );
    // console.log(productValidationResult);

    //--> is there any product?
    if (!productValidationResult.rows.length) {
      return res.json({
        error: "Product or category not found",
        packages: [],
        inputFields: [],
      });
    }

    const productId = productValidationResult.rows[0].id;
    const productItems = await loadProductItemsById(productId);

    // Get the form format based on product name
    const inputFields = await getInputFieldsByProductName(productName);

    res.json({
      packages: productItems.rows,
      inputFields: inputFields?.rows || [],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
