import { Route, Routes } from "react-router"
import Navbar from "../customer/Navbar/Navbar"
import Home from "../customer/pages/home/Home"
import Products from "../customer/pages/Product/Products"
import ProductDetails from "../customer/pages/Product/ProductDetails/ProductDetails"
import Cart from "../customer/pages/Cart/Cart"
import Checkout from "../customer/pages/CheckOut/Checkout"
import Profile from "../customer/pages/Order/Profile"
import Footer from "../customer/Footer/Footer"


const CustomerRoutes = () => {
  return (
    <div>
        {/* custom Routes  */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:categoryId" element={<Products />} />
        <Route path="/products/:categoryId" element={<Products />} />
        <Route
          path="/product-details/:categoryId/:name/:productId"
          element={<ProductDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/address" element={<Checkout />} />
        <Route path="/account/*" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default CustomerRoutes
