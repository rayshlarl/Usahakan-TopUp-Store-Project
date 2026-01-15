import SideBar from "../components/Sidebar";
import { Header } from "../components/Header";
import { Banner } from "../components/banner";
import { Product } from "../components/product";

const Home = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* <SideBar /> */}
      <div className="flex-1">
        <Header />
        <div className="min-h-screen p-8 flex justify-center">
          <div className=" w-fit">
            <Banner />
            <Product />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
