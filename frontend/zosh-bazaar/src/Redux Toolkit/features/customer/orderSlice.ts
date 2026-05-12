import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import { showSuccess, showError } from "../../../utils/toast";

const initialState = {
  orders: [],
  loading: false,
  error: "",
  orderItem: null,
  currentOrder: null,
  paymentOrder: null,
};

const API_URL = "/orders";

export const fetchUserOrderHistory = createAsyncThunk<any, any>(
  "/orders/fetchUserOrderHistory",

  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/user`, {
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

export const fetchOrderById = createAsyncThunk<any, any>(
  "/orders/fetchOrderById",

  async ({ jwt, orderId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${orderId}`, {
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

export const createOrder = createAsyncThunk<any, any>(
  "/orders/createOrder",
  async ({ address, jwt, paymentGateway }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_URL}`,
        {
          shippingAddress: address,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          params: {
            paymentMethod: paymentGateway,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchOrderItemById = createAsyncThunk<any, any>(
  "/orders/fetchOrderItemById",

  async ({ jwt, orderItemId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/item/${orderItemId}`, {
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

// Payment Success Handler
export const paymentSuccess = createAsyncThunk<any, any>(
  "/orders/paymentSuccess",

  async ({ jwt, paymentId, paymentLinkId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/payment/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
            paymentLinkId
        }
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const cancleOrder = createAsyncThunk<any, any>(
  "/orders/cancleOrder",

  async ( orderId , { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/${orderId}/cancel`,{}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
        builder.addCase(fetchUserOrderHistory.pending, (state)=> {
            state.loading = true
        })
        .addCase(fetchUserOrderHistory.fulfilled, (state, action)=> {
            state.loading = false;
            state.orders = action.payload
        })
        .addCase(fetchUserOrderHistory.rejected, (state, action)=> {
            state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch order history"
        })
        .addCase(fetchOrderById.pending, (state)=> {
            state.loading = true
        })
        .addCase(fetchOrderById.fulfilled, (state, action)=> {
            state.loading = false;
            state.currentOrder = action.payload
        })
        .addCase(fetchOrderById.rejected, (state, action)=> {
            state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch order"
        })
        .addCase(createOrder.pending, (state)=> {
            state.loading = true
        })
        .addCase(createOrder.fulfilled, (state, action)=> {
            state.loading = false;
            state.currentOrder = action.payload
            state.paymentOrder = action.payload
            showSuccess("Order created successfully!");
        })
        .addCase(createOrder.rejected, (state, action)=> {
            state.loading = false;
      state.error = (action.payload as string) || "Failed to create order"
      showError("Failed to create order");
        })
        .addCase(paymentSuccess.pending, (state)=> {
            state.loading = true
        })
        .addCase(paymentSuccess.fulfilled, (state, action)=> {
            state.loading = false;
            state.currentOrder = action.payload
            showSuccess("Payment successful!");
        })
        .addCase(paymentSuccess.rejected, (state, action)=> {
            state.loading = false;
      state.error = (action.payload as string) || "Payment success update failed"
      showError("Payment processing failed");
        })
        .addCase(cancleOrder.pending, (state)=> {
            state.loading = true
        })
        .addCase(cancleOrder.fulfilled, (state, action)=> {
            state.loading = false;
            state.currentOrder = action.payload
            showSuccess("Order cancelled successfully");
        })
        .addCase(cancleOrder.rejected, (state, action)=> {
            state.loading = false;
      state.error = (action.payload as string) || "Failed to cancel order"
      showError("Failed to cancel order");
        })
        .addCase(fetchOrderItemById.pending, (state)=> {
            state.loading = true
        })
        .addCase(fetchOrderItemById.fulfilled, (state, action)=> {
            state.loading = false;
            state.orderItem = action.payload
        })
        .addCase(fetchOrderItemById.rejected, (state, action)=> {
            state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch order item"
        })

    }
})


export default orderSlice.reducer;
