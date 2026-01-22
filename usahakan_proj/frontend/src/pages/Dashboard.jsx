import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Widget } from "../components/widget";
import { RecentOrders } from "../components/DashboardOrder";
import { getDahsboardData } from "../api/users_api";

const Dashboard = () => {
  const [dataValue, setDataValue] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDahsboardData();
        setDataValue(response);
      } catch (err) {
        console.log("error woi");
      }
    };
    fetchData();
  }, []);

  const widgetKey = ["kategori", "produk", "items", "terjual"];

  return (
    <>
      <Header />
      <div className="bg-gray-100 w-full min-h-screen flex justify-center items-start pt-0">
        <div className="flex gap-4 flex-wrap flex-col w-full max-w-7xl px-4">
          <div className="flex justify-center flex-row gap-5 mt-4">
            {widgetKey.map((widget, index) => (
              <Widget
                key={index}
                title={widget}
                value={dataValue?.[widget] ?? 0}
              />
            ))}
          </div>

          <div className="w-full">
            <RecentOrders />
          </div>
        </div>
      </div>
    </>
  );
};

export { Dashboard };
