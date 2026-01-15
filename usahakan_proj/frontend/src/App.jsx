import Home from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { LoginPage } from "./pages/UserLogin";
import { NotFoundHandler } from "./pages/404pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/:category/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundHandler />} />
      </Routes>
    </Router>
  );
};
export default App;
