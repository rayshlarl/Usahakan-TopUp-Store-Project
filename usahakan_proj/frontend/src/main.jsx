import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./store/CartContext.jsx";
import "./styles/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
