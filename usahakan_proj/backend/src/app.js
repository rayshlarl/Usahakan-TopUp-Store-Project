import express from "express";
import cors from "cors";
import homeRoutes from "./routes/homeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", homeRoutes);
app.use("/", authRoutes);
app.use("/", registerRoutes);
app.use("/", productRoutes);
app.use("/", dashboardRoutes);
app.use("/", orderRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "Halaman tidak ditemukan",
  });
});

export default app;
