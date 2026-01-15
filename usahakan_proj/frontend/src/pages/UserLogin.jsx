import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingInput } from "../components/FloatingInput";
import LoginBg from "../assets/loginbg.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email dan password wajib diisi");
      return;
    }

    setLoading(true);
    try {
      // TODO: Ganti dengan API login
      console.log("Login:", form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4">
      <img
        src={LoginBg}
        alt="Login background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 min-h-screen" />

      <div className="relative z-10 w-100 max-w-md bg-white rounded-2xl p-6 pt-20 shadow-xl">
        {/* Logo Circle */}
        <div className="w-28 h-28 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-blue-400 h-full w-full rounded-full overflow-hidden flex justify-center items-center border-white border-8 shadow-lg">
            <p className="text-white font-bold">Logo</p>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <h1 className="text-2xl font-bold">Masuk</h1>
          <p className="pt-2 text-gray-500">
            Halo kak. Silahkan masuk ke akun mu dulu ya :D
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FloatingInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="contoh@email.com"
          />

          <FloatingInput
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
          />

          <div className="pl-3 mt-[-10px]">
            <p className="text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-500">
              Lupa password?
            </p>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Loading..." : "Masuk"}
          </button>

          <p className="text-center text-gray-500 text-sm">
            Belum punya akun?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-500 font-semibold cursor-pointer hover:underline"
            >
              Daftar di sini
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export { LoginPage };
