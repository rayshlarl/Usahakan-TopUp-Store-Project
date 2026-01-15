import { useState, useEffect } from "react";
import defaultProfile from "../assets/default_profile.jpeg";
import { getDashboard_data } from "../api/users_api";
import { useCart } from "../../../backend/src/context/CartContext";
import LogoUsahakan from "../assets/usahakan.png";
import {
  BellIcon,
  ShoppingCartIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [profile, setProfile] = useState([]);
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboard_data();
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
        <BellIcon className="w-7" />
        <div className="relative">
          <ShoppingCartIcon
            onClick={() => navigate(`/cart`)}
            className="w-7 cursor-pointer"
          />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
        <span className="text-gray-400">|</span>

        <div
          onClick={() => navigate(`/login`)}
          className="flex flex-row items-center bg-blue-400 py-2 px-4 rounded-xl border-3 border-gray-50 cursor-pointer"
        >
          <p className="text-white font-bold pr-2">Login</p>
          <UserIcon className="w-5 text-white font-bold" />
        </div>

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
