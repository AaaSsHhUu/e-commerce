import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    productDetails : {},
    loading : true,
    error : null
}

export const fetchProductDetails = createAsyncThunk("fetchProductDetails", async (id) => {
    const response = await axios.get(`/api/v1/product/${id}`);
    console.log("product details : ", response.data);
    return response.data;
})

const productDetailsSlice = createSlice({
    name : "productDetails",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchProductDetails.pending, (state,action) => {
            state.loading = true;
        })
        builder.addCase(fetchProductDetails.fulfilled, (state,action) => {
            state.loading = false;
            state.productDetails = action.payload;
        })
        builder.addCase(fetchProductDetails.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export const productDetailsReducer =  productDetailsSlice.reducer;