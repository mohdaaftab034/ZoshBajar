import { Route, Routes } from "react-router";
import HomePage from "../seller/HomePage/HomePage";
import Products from "../seller/Products/Products";
import AddProducts from "../seller/Products/AddProducts";
import Orders from "../seller/Order/Orders";
import Account from "../seller/Account/Account";
import Payment from "../seller/Payment/Payment";
import Transaction from "../seller/Transaction/Transaction";

const SellerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/add-products" element={<AddProducts />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/account" element={<Account />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/transaction" element={<Transaction />} />
    </Routes>
  );
};

export default SellerRoutes;

