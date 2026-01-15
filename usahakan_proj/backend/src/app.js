import express from "express";
import cors from "cors";
import salesRouter from "./routes/sales.js";
import {
  loadUser,
  loadCategory,
  loadProducts,
  loadProduct_items,
  getInputFieldsByProductName,
  getProductWithCategory,
} from "./controller.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Dashboard route
app.get("/", async (req, res) => {
  try {
    const user_results = await loadUser();
    const category_results = await loadCategory();
    const products_results = await loadProducts();
    res.json({
      userData: user_results.rows,
      categoryData: category_results.rows,
      productsData: products_results.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Product detail route
app.get("/:cat/:game_id", async (req, res) => {
  try {
    const { cat, game_id } = req.params;

    // Validasi product dan category sekaligus dengan 1 query
    const productResult = await getProductWithCategory(game_id, cat);

    if (!productResult.rows.length) {
      return res.status(404).json({
        error: "Product or category not found",
        product_id: { rows: [] },
        input_fields: [],
      });
    }

    const productId = productResult.rows[0].id;

    const product_items_results = await loadProduct_items(productId);
    const input_fields_results = await getInputFieldsByProductName(game_id);

    res.json({
      product_id: product_items_results,
      input_fields: input_fields_results?.rows || [],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "Halaman tidak ditemukan",
  });
});

export default app;
