import { useCart } from "../../store/CartContext";
import { useNavigate } from "react-router-dom";
import LogoUsahakan from "../../assets/usahakan.png";
import { ShoppingCartIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { ProfileDropdown } from "../ProfileDropdown";

const BuyerHeader = ({ user }) => {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 bg-gray-100 flex justify-between flex-wrap border-b border-dashed border-gray-400">
      {/* Logo */}
      <div className="p-5 w-fit">
        <img
          src={LogoUsahakan}
          alt=""
          className="w-[120px] cursor-pointer"
          onClick={() => navigate("/")}
        />
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
        <BanknotesIcon className="w-7 cursor-pointer hover:text-blue-500 transition-colors" />
        <div className="relative">
          <ShoppingCartIcon
            onClick={() => navigate("/cart")}
            className="w-7 cursor-pointer hover:text-blue-500 transition-colors"
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
            className="flex items-center bg-blue-400 py-2 px-4 rounded-xl border-3 border-gray-50 cursor-pointer hover:bg-blue-500 transition-colors"
          >
            <p className="text-white font-bold pr-2">Login</p>
            <UserIcon className="w-5 text-white" />
          </div>
        ) : (
          <ProfileDropdown user={user} />
        )}
      </div>
    </div>
  );
};

export { BuyerHeader };
