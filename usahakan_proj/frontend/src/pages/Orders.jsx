import { Header } from "../components/Header";
import { RecentOrders } from "../components/DashboardOrder";
const OrderPages = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <RecentOrders />
        </div>
      </main>
    </>
  );
};

export { OrderPages };
