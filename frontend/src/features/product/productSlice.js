import  {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    products : [],
    loading : false,
    error : null,
    productCount : 0
}

export const fetchProducts = createAsyncThunk("fetchProducts", async(keyword="") => {
    let link = `/api/v1/products?keyword=${keyword}`;
    const response = await axios.get(link);
    // console.log("products data from backend : ",response.data);
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
            // console.log("action : ", action);
            state.loading = false;
            state.productCount = action.payload.productCount;
            state.products = action.payload.products;
        })

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export const productReducer = productSlice.reducer;