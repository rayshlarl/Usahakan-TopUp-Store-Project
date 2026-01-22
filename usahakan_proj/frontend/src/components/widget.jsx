import { CubeIcon } from "@heroicons/react/24/solid";

const Widget = ({ title, value }) => {
  return (
    <div className="bg-white rounded-2xl p-5 w-60 h-40 shadow-lg">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
          <CubeIcon className="h-5" />
        </div>
        <span className="text-md font-bold text-gray-700 flex-1">
          Total {title}
        </span>
      </div>

      <div className="text-center text-3xl font-bold text-gray-900 mb-2 tracking-tight">
        {value}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Diupdate 12/10/26</span>
      </div>
    </div>
  );
};

export { Widget };
