import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

type SellerOrderState = {
  orders: any[];
  loading: boolean;
  error: string;
};

const initialState: SellerOrderState = {
  orders: [],
  loading: false,
  error: "",
};

export const fetchSellerOrders = createAsyncThunk<any, any>(
  "sellerOrders/fetchSellerOrders",

  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/orders", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const updateOrdersStatus = createAsyncThunk<any, any>(
  "sellerOrders/updateOrdersStatus",

  async ({jwt, orderId, orderStatus}, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/sellers/orders/${orderId}/status/${orderStatus}`, {}, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const sellerOrderSlice = createSlice({
    name: "sellerOrders",
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(fetchSellerOrders.pending, (state)=> {
            state.loading = true
        })
        builder.addCase(fetchSellerOrders.fulfilled, (state, action)=> {
            state.loading = false;
            state.orders = action.payload
        })
        builder.addCase(fetchSellerOrders.rejected, (state, action)=> {
          state.loading = false;
          state.error = (action.payload as string) || "Failed to fetch seller orders";
        })
        builder.addCase(updateOrdersStatus.pending, (state)=> {
          state.loading = true
        })
        builder.addCase(updateOrdersStatus.fulfilled, (state, action)=> {
            state.loading = false;
          const index = state.orders.findIndex((order: any)=> order?._id === (action.payload as any)?._id);
          if (index !== -1) {
            state.orders[index] = action.payload as any;
          }
        })
        builder.addCase(updateOrdersStatus.rejected, (state, action)=> {
          state.loading = false;
          state.error = (action.payload as string) || "Failed to update order status";
        })
    }
})

export default sellerOrderSlice.reducer;

