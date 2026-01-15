import { useState } from "react";
import LogoUsahakan from "../assets/usahakan.png";

const menuItems = ["Dashboard", "Pesanan", "Settings"];

const SideBar = () => {
    const [activeMenu, setActiveMenu] = useState("Dashboard");

    return (
        <div className="sticky top-0 w-[200px] h-screen px-5 py-2.5 border-r border-dashed border-gray-400">
            {/* Logo */}
            <div className="flex justify-center items-center mb-12">
                <img src={LogoUsahakan} alt="Usahakan Logo" className="w-[170px]" />
            </div>

            {/* Menu */}
            <div className="flex flex-col gap-2.5">
                {menuItems.map((item) => (
                    <div
                        key={item}
                        className={`flex justify-center items-center px-3.5 py-2.5 rounded-[20px] cursor-pointer text-sm transition-all duration-300
              ${activeMenu === item
                                ? "bg-white border border-gray-400 font-semibold text-gray-800"
                                : "bg-gray-300 text-gray-600 hover:bg-gray-200"
                            }`}
                        onClick={() => setActiveMenu(item)}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
