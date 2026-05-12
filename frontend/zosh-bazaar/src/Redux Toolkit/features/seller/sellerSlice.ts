import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

type SellerState = {
  sellers: any[];
  selectedSeller: any;
  loading: boolean;
  error: string | null;
  profile: any;
  report: any;
  profileUpdated: boolean;
};

const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  loading: false,
  error: null,
  profile: null,
  report: null,
  profileUpdated: false,
};

const API_URL = "/sellers";

export const fetchSellerProfile = createAsyncThunk<any, any>(
  "sellers/fetchSellerProfile",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/profile`, {
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

export const fetchSellers = createAsyncThunk<any, any>(
  "sellers/fetchSellers",
  async (status, { rejectWithValue }) => {
    try {
      const params = status && status !== "ALL" ? { status } : undefined;
      const response = await api.get(`${API_URL}`, {
        params,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSellerReport = createAsyncThunk<any, any>(
  "sellers/fetchSellerReport",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/report`, {
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

export const fetchSellerById = createAsyncThunk<any, any>(
  "sellers/fetchSellerById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSllerAccountStatus = createAsyncThunk<any, any>(
  "sellers/updateSllerAccountStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/seller/${id}/status/${status}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch sellers";
      });
    builder
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.sellers = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch sellers";
      });
    builder
      .addCase(fetchSellerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerById.fulfilled, (state, action) => {
        state.selectedSeller = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch sellers";
      });
    builder
      .addCase(updateSllerAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSllerAccountStatus.fulfilled, (state, action) => {
        const index = state.sellers.findIndex(
          (seller: any) => seller?._id === (action.payload as any)?._id
        );
        if (index !== -1) {
          state.sellers[index] = action.payload as any;
        }
        state.loading = false;
      })
      .addCase(updateSllerAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch sellers";
      });
  },
});

export default sellerSlice.reducer;

