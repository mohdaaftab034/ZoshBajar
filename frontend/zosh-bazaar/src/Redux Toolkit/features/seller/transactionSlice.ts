import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

type TransactionState = {
  transactions: any[];
  loading: boolean;
  error: string;
};

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: "",
};

export const fetchTransactionBySeller = createAsyncThunk<any, any>(
  "transaction/fetchTransactionBySeller",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`/transactions/seller`, {
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

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactionBySeller.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchTransactionBySeller.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    });
    builder.addCase(fetchTransactionBySeller.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch transactions";
    });
  },
});


export default transactionSlice.reducer
