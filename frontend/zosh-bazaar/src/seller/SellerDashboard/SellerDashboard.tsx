import { useEffect } from "react";
import Navbar from "../../CommonComponents/Navbar";
import SellerDrawerList from "../sidebar/SellerDrawerList";
import SellerRoutes from "../../Routes/SellerRoutes";
import { useAppDispatch } from "../../Redux Toolkit/store";
import { fetchSellerReport } from "../../Redux Toolkit/features/seller/sellerSlice";

const SellerDashboard = () => {

  const dispatch = useAppDispatch()

  useEffect(()=> {
    dispatch(fetchSellerReport(localStorage.getItem("jwt")))
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar DrawerList={SellerDrawerList} />

      <section className="lg:flex lg:h-[90vh]">
        <div className="hidden lg:block h-full">
          <SellerDrawerList />
        </div>
        <div className="p-10 w-full lg:w-[80%] overflow-y-auto">
          <SellerRoutes />
        </div>
      </section>
    </div>
  );
};

export default SellerDashboard;

