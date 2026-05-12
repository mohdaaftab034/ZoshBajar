import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

type HomeCategoryState = {
  categories: any[];
  loading: boolean;
  error: string;
};

const API_URL = "/home";

export const updateHomeCategory = createAsyncThunk<any, any>(
  "/homeCategory/updateHomeCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/home-category/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchHomeCategory = createAsyncThunk<any, any>(
  "/homeCategory/fetchHomeCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/home-category/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: HomeCategoryState = {
  categories: [],
  loading: false,
  error: "",
};

const HomeCategorySlice = createSlice({
  name: "homeCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomeCategory.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchHomeCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload as any[];
    });
    builder.addCase(fetchHomeCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch categories";
    });
    builder.addCase(updateHomeCategory.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateHomeCategory.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.categories.findIndex(
        (category: any) => category._id === (action.payload as any)._id
      );
      if (index !== -1) {
        state.categories[index] = action.payload as any;
      }
    });
    builder.addCase(updateHomeCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to update category";
    });
  }
});

export default HomeCategorySlice.reducer

