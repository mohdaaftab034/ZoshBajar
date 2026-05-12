import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import { showSuccess, showError } from "../../../utils/toast";

const API_URL = "/coupons";

type CouponState = {
  coupons: any[];
  cart: any;
  loading: boolean;
  error: string | null;
  couponCreated: boolean;
  couponApplied: boolean;
};

export const applyCoupon = createAsyncThunk<any, any>(
  "/coupon/applyCoupon",
  async ({ apply, code, orderValue, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_URL}/apply`,
        { apply, code, orderValue },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as any)?.response?.data?.error || "Failed to Apply coupon"
      );
    }
  }
);

const initialState = {
  coupons: [],
  cart: null,
  loading: false,
  error: null,
  couponCreated: false,
  couponApplied: false,
} as CouponState;

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.couponApplied = false;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;

        if (action.meta.arg.apply == "true") {
          state.couponApplied = true;
          showSuccess("Coupon applied successfully!");
        } else {
          state.couponApplied = false;
          showSuccess("Coupon removed");
        }
      })
      .addCase(applyCoupon.rejected, (state, action: any) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to apply coupon";
        state.couponApplied = false;
        showError((action.payload as string) || "Failed to apply coupon");
      });
  },
});

export default couponSlice.reducer;

