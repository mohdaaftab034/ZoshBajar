import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import { showSuccess, showError } from "../../../utils/toast";


const API_URL = "/coupons"

export const createCoupon = createAsyncThunk<any, any>(
  "/coupon/createCoupon",
  async ({ jwt, coupon }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/admin/create`, coupon, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const fetchAllcoupon = createAsyncThunk<any, any>(
  "/coupon/fetchAllcoupon",
  async (jwt , { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/admin/all`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const deleteCoupon = createAsyncThunk<any, any>(
  "/coupon/deleteCoupon",
  async ({ jwt, id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/admin/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


type AdminCouponState = {
  coupons: any[];
  loading: boolean;
  error: string;
}

const initialState: AdminCouponState = {
  coupons: [],
  loading: false,
  error: ""
}


const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(createCoupon.pending, (state)=> {
            state.loading = true
            state.error = "";
        })
        .addCase(createCoupon.fulfilled, (state, action) => {
            state.loading = false
            state.coupons.push(action.payload)
            showSuccess("Coupon created successfully!");
        })
        .addCase(createCoupon.rejected, (state, action)=> {
          state.loading = false
          state.error = (action.payload as string) || action.error.message || "Failed to create coupon"
          showError("Failed to create coupon");
        })
        builder.addCase(fetchAllcoupon.pending, (state)=> {
            state.loading = true
            state.error = "";
        })
        .addCase(fetchAllcoupon.fulfilled, (state, action) => {
            state.loading = false
            state.coupons = action.payload
        })
        .addCase(fetchAllcoupon.rejected, (state, action)=> {
          state.loading = false
          state.error = (action.payload as string) || action.error.message || "Failed to fetch coupons"
        })
        builder.addCase(deleteCoupon.pending, (state)=> {
            state.loading = true
            state.error = "";
        })
        .addCase(deleteCoupon.fulfilled, (state, action) => {
          state.loading = false
          const id = (action.meta.arg as any)?.id;
          state.coupons = state.coupons.filter(
            (coupon: any) => coupon._id !== id
          )
          showSuccess("Coupon deleted successfully!");
        })
        .addCase(deleteCoupon.rejected, (state, action)=> {
          state.loading = false
          state.error = (action.payload as string) || action.error.message || "Failed to delete coupon"
          showError("Failed to delete coupon");
        })
    }
})

export default couponSlice.reducer

