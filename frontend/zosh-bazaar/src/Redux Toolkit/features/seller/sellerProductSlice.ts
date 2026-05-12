import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import { showSuccess, showError } from "../../../utils/toast";

const API_URL = "/sellers/products";

export const fetchSellerProduct = createAsyncThunk<any, any>(
  "/sellerProduct/fetchSellerProduct",
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

export const createProduct = createAsyncThunk<any, any>(
  "/sellerProduct/createProduct",
  async ({ jwt, request }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}`, request, {
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

export const updateProduct = createAsyncThunk<any, any>(
  "/sellerProduct/updateProduct",
  async ({ jwt, product, productId }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/${productId}`, product, {
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

type SellerProductState = {
  products: any[];
  loading: boolean;
  error: string;
};

const initialState: SellerProductState = {
  products: [],
  loading: false,
  error: "",
};

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSellerProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchSellerProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload as any[];
      state.error = "";
    });
    builder.addCase(fetchSellerProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch products";
      showError("Failed to load your products");
    });

    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.products.push(action.payload as any);
      showSuccess("Product created successfully!");
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to create product";
      showError("Failed to create product. Please try again.");
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      const index = state.products.findIndex(
        (product: any) => product._id === (action.payload as any)._id
      );
      if (index !== -1) {
        state.products[index] = action.payload as any;
      }
      showSuccess("Product updated successfully!");
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to update product";
      showError("Failed to update product. Please try again.");
    });
  },
});


export default sellerProductSlice.reducer
