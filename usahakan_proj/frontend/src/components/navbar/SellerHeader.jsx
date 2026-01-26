import { useNavigate, useLocation } from "react-router-dom";
import LogoUsahakan from "../../assets/usahakan.png";
import { ProfileDropdown } from "../ProfileDropdown";
import { Link } from "react-router-dom";

const SellerHeader = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Produk", path: "/products" },
    { name: "Pesanan", path: "/orders" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sticky top-0 bg-white flex justify-between items-center px-6 py-4 shadow-sm z-50">
      {/* Logo */}
      <img
        src={LogoUsahakan}
        alt=""
        className="w-[100px] cursor-pointer"
        onClick={() => navigate("/dashboard")}
      />

      {/* Navigation */}
      <nav className="flex gap-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`font-medium transition-colors ${
              isActive(item.path)
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Profile */}
      <ProfileDropdown user={user} />
    </div>
  );
};

export { SellerHeader };
