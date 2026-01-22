import Profile from "../assets/default_profile.jpeg";

const ProfileDropdown = ({ user }) => {
  return (
    <div className="relative group">
      <div className="flex items-center gap-3 bg-gray-200 px-5 py-2 rounded-xl border-2 border-gray-300 cursor-pointer">
        <p>{user.fullName}</p>
        <img src={Profile} alt="" className="w-8 rounded-full" />
      </div>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              localStorage.removeItem("cart");
              localStorage.removeItem("cartSelected");
              window.location.href = "/";
            }}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProfileDropdown };
