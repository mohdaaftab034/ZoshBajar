import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import authReducer from "./features/Auth/AuthSlice";
import userReducer from "./features/customer/userSlice"
import productReducer from "./features/customer/productSlice"
import orderReducer from "./features/customer/orderSlice"
import cartReducer from "./features/customer/cartSlice"
import couponReducer from "./features/customer/couponSlice"
import HomeCategoryReducer from "./features/customer/homeCategorySlice"
import addressReducer from "./features/customer/addressSlice"

import SellerAuthReducer from "./features/seller/sellerAuthentication"
import sellerOrderReducer from "./features/seller/sellerOrderSlice"
import sellerProductReducer from "./features/seller/sellerProductSlice"
import sellerReducer from "./features/seller/sellerSlice"
import transactionReducer from "./features/seller/transactionSlice"

import adminSlice from "./features/admin/adminSlice"
import dealSlice from "./features/admin/dealSlice"
import AdminCouponReducer from "./features/admin/couponSlice"
import reviewReducer from "./Review/reviewSlice"
import wishlistReducer from "./wishlist/wishlistSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  order: orderReducer,
  cart: cartReducer,
  coupon: couponReducer,
  homeCategory: HomeCategoryReducer,
  address: addressReducer,

  // Seller Reducers
  sellerAuth: SellerAuthReducer,
  sellerOrder: sellerOrderReducer,
  sellerProduct: sellerProductReducer,
  seller: sellerReducer,
  transaction: transactionReducer,

  // Admin Reducers
  admin: adminSlice,
  deal: dealSlice,
  adminCoupon: AdminCouponReducer,

  review: reviewReducer,
  wishlist: wishlistReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type AddDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AddDispatch>();

export const useAppSelectore: TypedUseSelectorHook<RootState> = useSelector;

export default store;

