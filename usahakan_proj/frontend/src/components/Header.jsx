import { useState, useEffect } from "react";
import { BuyerHeader } from "./navbar/BuyerHeader";
import { SellerHeader } from "./navbar/SellerHeader";
import { AdminHeader } from "./navbar/AdminHeader";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isUser = localStorage.getItem("user");
    if (isUser) {
      setUser(JSON.parse(isUser));
    }
  }, []);

  // Render berdasarkan role
  if (user?.role === "admin") {
    return <AdminHeader user={user} />;
  }

  if (user?.role === "seller") {
    return <SellerHeader user={user} />;
  }

  // Default: buyer atau guest
  return <BuyerHeader user={user} />;
};

export { Header };
