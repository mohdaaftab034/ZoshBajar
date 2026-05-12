import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../config/api"
import { showSuccess, showError } from "../../../utils/toast"

type DealCategory = {
    image?: string
    name?: string
    categoryId?: string
}

export type Deal = {
    _id?: string
    category?: DealCategory
    discount?: number
}

type DealState = {
    deals: Deal[]
    loading: boolean
    error: string | null
}

const initialState: DealState = {
    deals: [],
    loading: false,
    error: null
}


export const createDeal = createAsyncThunk<any, any>(
    "deal/createDeal",
    async(deal, {rejectWithValue}) => {
        try {
            const response = await api.post(`/admin/deals`, deal, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })

            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const getAllDeals = createAsyncThunk<any, any>(
"deal/getAllDeals",
    async(_, {rejectWithValue}) => {
        try {
            const response = await api.get(`/admin/deals`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })

            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)



export const deleteDeal = createAsyncThunk<any, any>(
"deal/deleteDeal",
    async(id, {rejectWithValue}) => {
        try {
            const response = await api.delete(`/admin/deals/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })

            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const updateDeal = createAsyncThunk<any, any>(
"deal/updateDeal",
    async({id, deal}, {rejectWithValue}) => {
        try {
            const response = await api.patch(`/admin/deals/${id}`, deal, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })

            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const dealSlice = createSlice({
    name: "deal",
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(createDeal.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createDeal.fulfilled, (state, action) => {
            state.loading = false
            state.deals.push(action.payload as Deal)
            showSuccess("Deal created successfully!");
        })
        builder.addCase(createDeal.rejected, (state) => {
            state.loading = false
            showError("Failed to create deal");
        })
        builder.addCase(getAllDeals.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllDeals.fulfilled, (state, action) => {
            state.loading = false
            state.deals = action.payload as Deal[]
        })
        builder.addCase(getAllDeals.rejected, (state, action) => {
            state.loading = false
            state.error = (action.payload as string) ?? null
        })
        builder.addCase(deleteDeal.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteDeal.fulfilled, (state, action) => {
            state.loading = false
            state.deals = state.deals.filter((deal: Deal) => deal._id !== action.meta.arg)
            showSuccess("Deal deleted successfully!");
        })
        builder.addCase(deleteDeal.rejected, (state, action) => {
            state.loading = false
            state.error = (action.payload as string) ?? null
            showError("Failed to delete deal");
        })
        builder.addCase(updateDeal.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateDeal.fulfilled, (state, action) => {
            state.loading = false
            const index = state.deals.findIndex((deal: Deal)=> deal._id === (action.payload as Deal)._id)
            state.deals[index] = action.payload as Deal
            showSuccess("Deal updated successfully!");
        })
        builder.addCase(updateDeal.rejected, (state, action) => {
            state.loading = false
            state.error = (action.payload as string) ?? null
            showError("Failed to update deal");
        })
    }
})

export default dealSlice.reducer
