import { useNavigate, useLocation } from "react-router-dom";
import { ProfileDropdown } from "../ProfileDropdown";
import {
  UsersIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const AdminHeader = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Users", path: "/admin/users", icon: UsersIcon },
    { name: "Products", path: "/admin/products", icon: CubeIcon },
    { name: "Orders", path: "/admin/orders", icon: ClipboardDocumentListIcon },
    { name: "Logs", path: "/admin/logs", icon: DocumentTextIcon },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sticky top-0 bg-gray-900 flex justify-between items-center px-6 py-4 z-50">
      {/* Logo */}
      <h1
        className="font-bold text-xl text-white cursor-pointer"
        onClick={() => navigate("/admin")}
      >
        Admin Panel
      </h1>

      {/* Navigation */}
      <nav className="flex gap-6">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isActive(item.path)
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <item.icon className="w-5" />
            <span>{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Profile */}
      <div className="text-white">
        <ProfileDropdown user={user} />
      </div>
    </div>
  );
};

export { AdminHeader };
