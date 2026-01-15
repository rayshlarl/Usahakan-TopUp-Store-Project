import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";

const NotFoundHandler = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="font-bold text-6xl">404</h1>
        <div className="py-5 w-1/3 text-center">
          <p>
            Mungkin halaman yang kamu cari engga ada atau berubah, tapi tenang
            kamu ga nyasar kok
          </p>
        </div>
        <button
          onClick={() => navigate(`/`)}
          className="bg-blue-400 px-10 py-3 rounded-2xl text-white font-bold cursor-pointer"
        >
          Kembali ke home
        </button>
      </div>
    </div>
  );
};
export { NotFoundHandler };
