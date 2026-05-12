import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";
import { showSuccess, showError } from "../../utils/toast";

interface ReviewState {
    reviews: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ReviewState = {
    reviews: [],
    loading: false,
    error: null,
};

export const fetchReviewsByProduct = createAsyncThunk<any, any>(
    "review/fetchReviewsByProduct",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/reviews/product/${productId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                (error as any)?.response?.data?.message || "Failed to fetch reviews"
            );
        }
    }
);

// Create review thunk
export const createReview = createAsyncThunk<any, any>(
    "review/createReview",
    async ({ productId, reviewText, rating, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.post(
                `/reviews/product/create`,
                {
                    productId: productId,
                    reviewText,
                    rating,
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                (error as any)?.response?.data?.message || "Failed to create review"
            );
        }
    }
);


const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchReviewsByProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchReviewsByProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews = action.payload as any[];
        });
        builder.addCase(fetchReviewsByProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as string) || "Failed to fetch reviews";
        });

        builder.addCase(createReview.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createReview.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews.unshift(action.payload as any);
            showSuccess("Review posted successfully!");
        });
        builder.addCase(createReview.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as string) || "Failed to create review";
            const errorMessage = (action.payload as string) || "Failed to post review";
            showError(errorMessage);
        });
    },
});

export default reviewSlice.reducer;
