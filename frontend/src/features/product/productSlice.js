import  {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    products : [],
    loading : false,
    error : null
}

export const fetchProducts = createAsyncThunk("fetchProducts", async() => {
    const response = await axios.get("/api/v1/products");
    console.log("products : ",response.data);
    return response.data;
})

const productSlice = createSlice({
    name : "product",
    initialState,
    // reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchProducts.pending, (state,action) => {
            state.loading = true;
        })

        builder.addCase(fetchProducts.fulfilled, (state,action) => {
            state.loading = false;
            state.products = action.payload.products;
        })

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const productReducer = productSlice.reducer;