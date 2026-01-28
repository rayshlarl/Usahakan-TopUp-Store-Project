import Home from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { LoginPage } from "./pages/UserLogin";
import { RegisterPage } from "./pages/UserRegister";
import { NotFoundHandler } from "./pages/404pages";
import { Dashboard } from "./pages/Dashboard";
import { OrderPages } from "./pages/Orders";
import { ProductManagement } from "./pages/ProductManagement";
import { ItemManagement } from "./pages/itemManagement";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/:category/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/orders" element={<OrderPages />} />
        <Route path="/products/:productName" element={<ItemManagement />} />
        <Route path="*" element={<NotFoundHandler />} />
      </Routes>
    </Router>
  );
};
export default App;
