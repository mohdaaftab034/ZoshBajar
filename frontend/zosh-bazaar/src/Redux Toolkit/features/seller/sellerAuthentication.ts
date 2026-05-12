import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import { fetchSellerProfile } from "./sellerSlice";
import { showSuccess, showError } from "../../../utils/toast";

const initialState = {
  jwt: null,
  role: null,
  error: null,
  loading: false,
};

const API_URL = "/sellers";

export const loginSeller = createAsyncThunk<any, any>(
  "/sellers/loginSeller",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post(`${API_URL}/login`, data);

      localStorage.setItem("jwt", response.data.jwt);

      // Fetch seller profile after successful login
      await dispatch(fetchSellerProfile(response.data.jwt));

      data.navigate("/seller");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createSeller = createAsyncThunk<any, any>(
  "/sellers/createSeller",
  async ({ seller, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post(`${API_URL}`, seller);
      localStorage.setItem("jwt", response.data.jwt);
      
      // Fetch seller profile after successful creation
      await dispatch(fetchSellerProfile(response.data.jwt));
      
      if (navigate) navigate("/seller");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    resetSellerAuthState: (state) => {
      state.jwt = null;
      state.role = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Create Seller
    builder.addCase(createSeller.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createSeller.fulfilled, (state, action) => {
      state.loading = false;
      state.jwt = action.payload.jwt;
      state.role = action.payload.role;
      showSuccess("Seller account created successfully!");
    });
    builder.addCase(createSeller.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as any;
      const errorMessage = (action.payload as any)?.response?.data?.message || "Failed to create seller account";
      showError(errorMessage);
    });

    // Login Seller
    builder.addCase(loginSeller.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginSeller.fulfilled, (state, action) => {
      state.loading = false;
      state.jwt = action.payload.jwt;
      state.role = action.payload.role;
      showSuccess("Login successful! Welcome back.");
    });
    builder.addCase(loginSeller.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as any;
      const errorMessage = (action.payload as any)?.response?.data?.message || "Login failed. Please check your credentials";
      showError(errorMessage);
    });
  },
});

export const { resetSellerAuthState } = sellerSlice.actions;

export default sellerSlice.reducer;

