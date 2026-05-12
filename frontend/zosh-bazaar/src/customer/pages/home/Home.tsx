import ElectronicCategory from "./electronicCategory/ElectronicCategory";
import Grid from "./Grid/Grid";
import Deal from "./Deal/Deal";
import HomeCategory from "./HomeCategory/HomeCategory";
import { Button } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 sm:space-y-10 w-full">
      <ElectronicCategory />
      <section>
        <Grid />
      </section>
      <section className="pt-6 sm:pt-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center pb-6 sm:pb-10 text-teal-600 ">Today's Deal</h1>
        <Deal />
      </section>
      <section className="pt-6 sm:pt-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center pb-6 sm:pb-12 text-teal-500 ">
          Shop By Category
        </h1>
        <div>
          <HomeCategory />
        </div>
      </section>
      <section className="px-4 sm:px-8 lg:px-20 relative h-[180px] sm:h-[250px] md:h-[350px] lg:h-[450px] object-cover  ">
        <img
          src={"https://zosh-bazzar.vercel.app/seller_banner_image.jpg"}
          alt="Seller Banner"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute top-1/2 left-4 sm:left-6 lg:left-60 transform -translate-y-1/2 font-semibold space-y-2 sm:space-y-3">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-lg">Sell Your Product</h1>
          <p className="text-sm sm:text-lg md:text-2xl text-white drop-shadow-md ">
            With{" "}
            <strong className="logo text-xl sm:text-3xl md:text-5xl pl-2 drop-shadow-lg">
              zosh bazaar
            </strong>
          </p>

          <div className="pt-3 sm:pt-6 flex justify-center lg:justify-start">
            <Button onClick={()=> navigate("/become-seller")} startIcon={<StoreIcon />} variant="contained" size="small" sx={{ fontSize: "0.875rem" }}>
              Become Seller
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

