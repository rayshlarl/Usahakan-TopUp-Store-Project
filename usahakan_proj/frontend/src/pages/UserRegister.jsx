import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingInput } from "../components/FloatingInput";
import LoginBg from "../assets/loginbg.png";
import { getRegisterData } from "../api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Validasi
    const formValidation = () => {
      switch (true) {
        case !form.fullname.trim():
          setError("Nama gaboleh kosong ya kak :(");
          return false;
        case !form.email.trim():
          setError("Email juga gaboleh kosong kak :(");
          return false;
        case !form.password || form.password.length < 6:
          setError("Password minimal 6 karakter kak :)");
          return false;
        case form.password !== form.passwordConfirm:
          setError("Password harus sama ya kak :(");
          return false;
        default:
          return true;
      }
    };

    if (!formValidation()) return;

    setLoading(true);
    try {
      const response = await getRegisterData(
        form.fullname,
        form.email,
        form.password,
        form.passwordConfirm
      );

      if (response.success) {
        alert("Pendaftaran berhasil! Silakan masuk.");
        navigate("/login");
      }
    } catch (err) {
      //   console.error(err); --> Buat debug error
      const serverError = err.response?.data?.errors
        ? err.response.data.errors[0].msg
        : err.response?.data?.message;

      setError(serverError || "Terjadi kesalahan saat mendaftar");
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
          <h1 className="text-2xl font-bold">Daftar</h1>
          <p className="pt-2 text-gray-500">
            Halo kak. Daftarin akun mu dulu ya :D
          </p>
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center pb-5">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FloatingInput
            label="Nama Lengkap"
            type="text"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            placeholder="Nama Kamu"
          />

          <FloatingInput
            label="Surel"
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email@kamu.com"
          />

          <FloatingInput
            label="Sandi"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Sandi Kamu"
          />
          <FloatingInput
            label="Konfirmasi sandi"
            type="password"
            name="passwordConfirm"
            value={form.passwordConfirm}
            onChange={handleChange}
            placeholder="Konfirmasi sandi kamu"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Loading..." : "Daftar sekarang"}
          </button>

          <p className="text-center text-gray-500 text-sm">
            Sudah punya akun?{" "}
            <span
              //   onClick={() => navigate("/login")}
              className="text-blue-500 font-semibold cursor-pointer hover:underline"
            >
              Masuk
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export { RegisterPage };
