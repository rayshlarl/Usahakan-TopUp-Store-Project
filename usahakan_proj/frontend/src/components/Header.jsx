import { useState, useEffect } from "react";
import defaultProfile from "../assets/default_profile.jpeg";
import { getDashboardData } from "../api/users_api";
import { useCart } from "../store/CartContext";
import LogoUsahakan from "../assets/usahakan.png";
import Profile from "../assets/default_profile.jpeg";
import { ShoppingCartIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState(null);
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const isUser = localStorage.getItem("user");
    if (isUser) {
      setUser(JSON.parse(isUser));
    }
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        setProfile(response.userData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="sticky top-0 bg-gray-100 flex justify-between flex-wrap border-b border-dashed border-gray-400">
      {/* Greetings text */}
      <div className="p-5 w-fit">
        <img src={LogoUsahakan} alt="" className="w-[120px]" />
      </div>

      {/* SearchBar */}
      <div className="flex w-[50%] justify-center items-center">
        <input
          type="text"
          placeholder="Mau cari apa?"
          className="w-full pl-5 h-10 rounded-full border border-gray-300 outline-none text-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Right corner */}
      <div className="mr-12 flex justify-center items-center gap-5">
        <BanknotesIcon className="w-7" />
        <div className="relative">
          <ShoppingCartIcon
            onClick={() => navigate("/cart")}
            className="w-7 cursor-pointer"
          />

          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
        <span className="text-gray-400">|</span>
        {!user ? (
          <div
            onClick={() => navigate("/login")}
            className="flex flex-row items-center bg-blue-400 py-2 px-4 rounded-xl border-3 border-gray-50 cursor-pointer"
          >
            <p className="text-white font-bold pr-2">Login</p>
            <UserIcon className="w-5 text-white font-bold" />
          </div>
        ) : (
          <div className="relative group">
            {/* Profile Button */}
            <div className="flex flex-row items-center gap-3 bg-gray-200 px-5 py-2 rounded-xl border-2 border-gray-300 cursor-pointer">
              <p>{user.fullName}</p>
              <div>
                <img src={Profile} alt="" className="w-8 rounded-full" />
              </div>
            </div>

            {/* Dropdown Menu - Muncul saat hover */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("cart");
                    window.location.reload();
                  }}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* <div className="flex flex-row items-center bg-gray-200 py-2 px-4 rounded-xl border-2 border-gray-300">
          <p className="pr-3">Rayshal</p>
          <img
            src={defaultProfile}
            alt=""
            className="w-9 rounded-full border border-gray-400"
          />
        </div> */}
      </div>
    </div>
  );
};

export { Header };
