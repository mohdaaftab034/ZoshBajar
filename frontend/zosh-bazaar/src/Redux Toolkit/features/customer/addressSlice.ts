import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

type AddressState = {
  addresses: any[];
  loading: boolean;
  error: string;
};

const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: "",
};

const API_URL = "/addresses";

export const createAddress = createAsyncThunk<any, any>(
  "/addresses/createAddress",
  async ({ addressData, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}`, addressData, {
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

export const fetchUserAddresses = createAsyncThunk<any, any>(
  "/addresses/fetchUserAddresses",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}`, {
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

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push((action.payload as any).data);
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create address";
      })
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.data || [];
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch addresses";
      });
  },
});

export default addressSlice.reducer;

