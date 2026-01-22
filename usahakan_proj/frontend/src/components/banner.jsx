import MainBanner from "../assets/MainBanner.png";

const Banner = () => {
  return (
    <div className="h-75 flex justify-center mt-2 ">
      <div className="bg-gray-300 rounded-[25px] flex justify-center items-center w-[100vh] overflow-hidden">
        <img src={MainBanner} alt="" />
      </div>
    </div>
  );
};

export { Banner };
