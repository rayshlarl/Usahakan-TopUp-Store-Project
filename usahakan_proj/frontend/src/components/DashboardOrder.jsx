import { getOrdersData } from "../api/users_api";
import { useState, useEffect } from "react";
import { PhotoIcon, EyeIcon } from "@heroicons/react/24/solid";
import ProductPortal from "./ProductPortal";

const RecentOrders = () => {
  const [order, setOrder] = useState([]);
  const [showProductPortal, setShowProductPortal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenProductPortal = (orderData) => {
    setSelectedOrder(orderData);
    setShowProductPortal(true);
  };

  const handleCloseProductPortal = () => {
    setShowProductPortal(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrdersData();
        setOrder(response.orders.rows);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-emerald-500 text-white";
      case "Diproses":
        return "bg-gray-100 text-gray-600 border border-gray-300";
      case "Ditolak":
        return "bg-red-100 text-red-500 border border-red-300";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 m-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Pesanan hari ini</h2>
          <p className="text-gray-500 text-sm">
            Atur dan pantau transaksimu :D
          </p>
        </div>
      </div>
      <hr className="pb-5 text-gray-200" />

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs text-gray-400 uppercase tracking-wider">
            <th className="pb-4 font-medium">No</th>
            <th className="pb-4 font-medium">Invoice Code</th>
            <th className="pb-4 font-medium">Status</th>
            <th className="pb-4 font-medium">User ID</th>
            <th className="pb-4 font-medium">Guest Email</th>
            <th className="pb-4 font-medium">Product</th>
            <th className="pb-4 font-medium">Attach</th>
            <th className="pb-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {order.map((order, index) => (
            <tr key={index} className="text-sm">
              <td className="py-5 text-gray-500">{order.no}</td>
              <td className="py-5 font-medium text-gray-800">
                {order.invoice_code}
              </td>
              <td className="py-5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-5 text-gray-600">{order.user_id}</td>
              <td className="py-5 text-gray-600">{order.guest_email}</td>
              <td className="py-5">
                <button
                  onClick={() => handleOpenProductPortal(order)}
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <EyeIcon className="w-4" />
                  <span className="text-xs">
                    See
                    <br />
                    here
                  </span>
                </button>
              </td>
              <td className="py-5">
                <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 cursor-pointer">
                  <PhotoIcon className="w-5" />
                  <span className="text-xs">
                    See
                    <br />
                    here
                  </span>
                </button>
              </td>
              <td className="py-5">
                <button className="cursor-pointer px-4 py-2 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600">
                  Click
                  <br />
                  here
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Product Portal */}
      {showProductPortal && (
        <ProductPortal
          order={selectedOrder}
          onClose={handleCloseProductPortal}
        />
      )}
    </div>
  );
};

export { RecentOrders };
