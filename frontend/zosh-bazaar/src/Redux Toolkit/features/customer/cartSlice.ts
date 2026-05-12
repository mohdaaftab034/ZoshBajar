import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import { showSuccess, showError } from "../../../utils/toast";

type CartState = {
  cart: any;
  loading: boolean;
  error: string;
};

const initialState: CartState = {
  cart: null,
  loading: false,
  error: "",
};

const API_URL = "/cart";

export const fetchCart = createAsyncThunk<any, any>(
  "/cart/fetchCart",
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

export const addItemToCart = createAsyncThunk<any, any>(
  "/cart/addItemToCart",
  async ({ jwt, request }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/add`, request, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error) {
      //
      return rejectWithValue(error);
    }
  }
);

export const deleteCartItem = createAsyncThunk<any, any>(
  "/cart/deleteCartItem",
  async ({ jwt, cartItemId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/item/${cartItemId}`, {
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

export const updateCartItem = createAsyncThunk<any, any>(
  "/cart/updateCartItem",
  async ({ jwt, cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${API_URL}/item/${cartItemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch cart";
    });
    builder.addCase(addItemToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.loading = false;
      const cart: any = state.cart as any;
      const addedItem = action.payload as any;

      if (cart && Array.isArray(cart.cartItems)) {
        const existingIndex = cart.cartItems.findIndex(
          (item: any) => item._id === addedItem._id
        );

        if (existingIndex !== -1) {
          cart.cartItems[existingIndex] = addedItem;
        } else {
          cart.cartItems.push(addedItem);
        }
      } else {
        state.cart = {
          ...(cart || {}),
          cartItems: [addedItem],
        };
      }
      showSuccess("Item added to cart");
    });
    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to add item";
      showError("Failed to add item to cart");
    });
    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      state.loading = false;

      const cart: any = state.cart as any;
      if (cart && Array.isArray(cart.cartItems)) {
        const updatedItem = action.payload as any;

        const index = cart.cartItems.findIndex(
          (item: any) => item._id === updatedItem._id
        );

        if (index !== -1) {
          cart.cartItems[index] = updatedItem;
        }
      }
      showSuccess("Cart item updated");
    });

    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to update cart item";
      showError("Failed to update cart item");
    });
    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.loading = false;
      const cart: any = state.cart as any;
      if (!cart || !Array.isArray(cart.cartItems)) return;

      const deletedId = (action.meta.arg as any).cartItemId;

      cart.cartItems = cart.cartItems.filter(
        (item: any) => item._id !== deletedId
      );
      showSuccess("Item removed from cart");
    });

    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to delete cart item";
      showError("Failed to remove item from cart");
    });
  },
});

export default cartSlice.reducer;

