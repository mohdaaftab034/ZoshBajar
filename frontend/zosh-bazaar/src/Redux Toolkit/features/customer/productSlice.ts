import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const API_URL = "/products";

const initialState = {
  product: null,
  products: [],
  relatedProducts: [],
  loading: false,
  error: "",
  searchProducts: [],
  totalElement: 0,
  totalPages: 0,
};

export const fetchProductById = createAsyncThunk<any, any>(
  "/products/fetchProductById",
  async (productsId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${productsId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchProducts = createAsyncThunk<any, any>(
  "/products/searchProduct",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/search/`, {
        params: {
          query,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllProducts = createAsyncThunk<any, any>(
  "/products/getAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        params: {
          ...params,
          pageNumber: params.pageNumber || 0,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getRelatedProducts = createAsyncThunk<any, any>(
  "/products/getRelatedProducts",
  async ({ categoryId, currentProductId }, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        params: {
          category: categoryId,
          pageNumber: 0,
        },
      });

      // Filter out the current product from results
      if (response.data && response.data.content) {
        response.data.content = response.data.content.filter(
          (product: any) => product._id !== currentProductId
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.products = [];
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.content;
        state.totalElement = action.payload.totalElement;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProducts = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getRelatedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload.content || [];
      })
      .addCase(getRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.relatedProducts = [];
      });
  },
});


export default productSlice.reducer;

