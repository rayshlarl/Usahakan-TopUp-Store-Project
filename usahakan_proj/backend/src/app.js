import express from "express";
import cors from "cors";
import homeRoutes from "./routes/homeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", homeRoutes);
app.use("/", authRoutes);
app.use("/", productRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "Halaman tidak ditemukan",
  });
});

export default app;
