import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

export type UserProfile = {
  fullName?: string;
  email?: string;
  mobile?: string;
  profilePicture?: string;
};

type UserState = {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
};

export const fetchUserProfile = createAsyncThunk<any, any>(
  "/users/fetchUserProfile",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/profile`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      (state.user = null), (state.loading = false), (state.error = null);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      (state.loading = true), (state.error = null);
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      (state.loading = false), (state.user = action.payload);
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message || null);
    });
  },
});

export const {resetUserState} = userSlice.actions

export default userSlice.reducer;

