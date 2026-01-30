import express from "express";
import cors from "cors";
import homeRoutes from "./routes/homeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import itemManagementRoutes from "./routes/itemManagementRoutes.js";
import productManagementRoutes from "./routes/productManagementRoutes.js";
import inputTypesRoutes from "./routes/inputFieldsRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/", express.static("public"));

// Routes
app.use("/", homeRoutes);
app.use("/", authRoutes);
app.use("/", registerRoutes);
app.use("/", itemManagementRoutes); // fix - dynamix
app.use("/", productManagementRoutes);
app.use("/", inputTypesRoutes);
app.use("/", productRoutes); // 2 2 nya dynamic
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
