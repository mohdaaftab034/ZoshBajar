import { Route, Routes } from "react-router";
import SellerTable from "../admin/Seller/SellerTable";
import Coupons from "../admin/Coupon/Coupons";
import CouponsForm from "../admin/Coupon/CouponsForm";
import GridTable from "../admin/HomePage/GridTable";
import ElectronicsTable from "../admin/HomePage/ElectronicsTable";
import ShopByCategoryTable from "../admin/HomePage/ShopByCategoryTable";
import Deal from "../admin/Deal/Deal";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SellerTable />} />
      <Route path="/coupons" element={<Coupons />} />
      <Route path="/add-coupons" element={<CouponsForm />} />
      <Route path="/home-grid" element={<GridTable />} />
      <Route path="/electronics-category" element={<ElectronicsTable />} />
      <Route path="/shop-by-category" element={<ShopByCategoryTable />} />
      <Route path="/deals" element={<Deal />} />
    </Routes>
  );
};

export default AdminRoutes;

