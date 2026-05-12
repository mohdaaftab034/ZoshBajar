import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

export const createHomeCategories = createAsyncThunk<any, any>(
  "homeCategories/createHomeCategories",
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/categories", homeCategories);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failde to load Home Categories Data";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateHomeCategory = createAsyncThunk<any, any>(
  "homeCategories/updateHomeCategory", 
  async({id, homeCategory}, {rejectWithValue}) => {
    try {
      const response = await api.patch(`/home/home-category/${id}`, homeCategory)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
)

export const createSingleHomeCategory = createAsyncThunk<any, any>(
  "homeCategories/createSingleHomeCategory",
  async(homeCategory, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/home-category", homeCategory);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
)

type HomeCategoryState = {
  homeCategories: any;
  loading: boolean;
  error: string | null;
};

const initialState: HomeCategoryState = {
  homeCategories: [],
  loading: false,
  error: null,
};

const HomeCategorySlice = createSlice({
  name: "homeCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCategories = action.payload;
      })
      .addCase(createHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to load home categories";
      })
      .addCase(updateHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Find and update the specific category in the homeCategories
        if (state.homeCategories && Array.isArray(state.homeCategories)) {
          // If homeCategories is an array, update the item directly
          const index = state.homeCategories.findIndex(
            (cat: any) => cat._id === action.payload._id
          );
          if (index !== -1) {
            state.homeCategories[index] = action.payload;
          }
        } else if (state.homeCategories && typeof state.homeCategories === 'object') {
          // If homeCategories is an object with sections (grid, shopByCategories, etc)
          const sections = ['grid', 'shopByCategories', 'electricCategories', 'dealCategories', 'deals'];
          for (const section of sections) {
            if (Array.isArray(state.homeCategories[section])) {
              const index = state.homeCategories[section].findIndex(
                (cat: any) => cat._id === action.payload._id
              );
              if (index !== -1) {
                state.homeCategories[section][index] = action.payload;
                break;
              }
            }
          }
        }
      })
      .addCase(updateHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update home category";
      })
      .addCase(createSingleHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSingleHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Add new category to the appropriate section
        if (state.homeCategories && typeof state.homeCategories === "object") {
          const section = (action.payload as any).section;
          if (Array.isArray((state.homeCategories as any)[section])) {
            (state.homeCategories as any)[section].push(action.payload as any);
          }
        }
      })
      .addCase(createSingleHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create home category";
      });
  },
});

export default HomeCategorySlice.reducer;

