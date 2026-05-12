import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import { resetUserState } from "../customer/userSlice";
import { resetSellerAuthState } from "../seller/sellerAuthentication";
import { showSuccess, showError } from "../../../utils/toast";

const API_URL = "/auth";

const initialState = {
  jwt: null,
  role: null,
  loading: false,
  error: null,
};

export const signup = createAsyncThunk<any, any>(
  "/auth/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/signup`, signupRequest);

      localStorage.setItem("jwt", response.data.jwt);
      signupRequest.navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signin = createAsyncThunk<any, any>(
  "/auth/signin",
  async (signinRequest, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/signin`, signinRequest);

      localStorage.setItem("jwt", response.data.jwt);
      if (response.data.role === "ROLE_ADMIN") {
        signinRequest.navigate("/admin");
      } else {
        signinRequest.navigate("/");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      (state.jwt = null), (state.role = null);
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.jwt = action.payload.jwt;
      state.role = action.payload.role;
      showSuccess("Account created successfully!");
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as any;
      const errorMessage = (action.payload as any)?.response?.data?.message || "Signup failed. Please try again";
      showError(errorMessage);
    });

    // Signin
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.jwt = action.payload.jwt;
      state.role = action.payload.role;
      showSuccess("Login successful!");
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as any;
      const errorMessage = (action.payload as any)?.response?.data?.message || "Login failed. Please check your credentials";
      showError(errorMessage);
    });
  },
});

export const { logout } = authSlice.actions;

export const performLogout = () => async (dispatch: any) => {
  dispatch(logout());
  dispatch(resetUserState());
  dispatch(resetSellerAuthState());
  localStorage.removeItem("jwt");
  showSuccess("Logged out successfully");
};

export default authSlice.reducer;
