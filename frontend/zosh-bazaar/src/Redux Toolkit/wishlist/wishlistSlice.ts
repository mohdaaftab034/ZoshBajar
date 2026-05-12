import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { showSuccess, showError } from "../../utils/toast";

type WishlistState = {
  wishlist: any;
  loading: boolean;
  error: string | null;
};

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

// 1. Add Product to Wishlist
export const addProductToWishlist = createAsyncThunk<any, any>(
  "wishlist/addProductToWishlist",
  async ({ productId, size, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/wishlist/add",
        { productId, size },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = (error as any)?.response?.data?.message || "Failed to add product to wishlist";
      return rejectWithValue(message);
    }
  }
);

// 2. Get Wishlist Items
export const fetchWishlistItems = createAsyncThunk<any>(
  "wishlist/fetchWishlistItems",
  async ( _, { rejectWithValue }) => {
    try {
      const response = await api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return response.data;
    } catch (error) {
      const message = (error as any)?.response?.data?.message || "Failed to fetch wishlist items";
      return rejectWithValue(message);
    }
  }
);

// 3. Remove Item from Wishlist
export const removeItemFromWishlist = createAsyncThunk<any, any>(
  "wishlist/removeItemFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/wishlist/remove/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message = (error as any)?.response?.data?.message || "Failed to remove item from wishlist";
      return rejectWithValue(message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlistState: (state) => {
      state.wishlist = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addProductToWishlist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProductToWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlist = action.payload;
      showSuccess("Added to wishlist");
    });
    builder.addCase(addProductToWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to add product to wishlist";
      const errorMessage = (action.payload as string) || "Failed to add to wishlist";
      showError(errorMessage);
    });

    builder.addCase(fetchWishlistItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWishlistItems.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlist = action.payload;
    });
    builder.addCase(fetchWishlistItems.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch wishlist";
    });
    builder.addCase(removeItemFromWishlist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeItemFromWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlist = action.payload;
      showSuccess("Removed from wishlist");
    });
    builder.addCase(removeItemFromWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to remove item";
      const errorMessage = (action.payload as string) || "Failed to remove from wishlist";
      showError(errorMessage);
    });
  },
});

export const { resetWishlistState } = wishlistSlice.actions;

export default wishlistSlice.reducer;

