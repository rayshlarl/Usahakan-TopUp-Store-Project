const Usergame_id_input = () => {
  return (
    <div className="w-full bg-white flex justify-center mt-10 p-5 rounded-2xl shadow-md">
      <form className="w-full max-w-xl">
        <div className="flex">
          <input
            type="text"
            placeholder="Masukkan ID"
            className="flex-1 px-4 py-2 rounded-l-2xl border border-gray-300 shadow-sm
                   outline-none focus:border-indigo-500 focus:ring-2
                   focus:ring-indigo-500/20 transition-all"
          />

          <input
            type="text"
            placeholder="Masukkan Server"
            className="w-1/3 px-4 py-2 rounded-r-2xl border border-l-0 border-gray-300 shadow-sm
                   outline-none focus:border-indigo-500 focus:ring-2
                   focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </form>
    </div>
  );
};
export { Usergame_id_input };
