import  {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    products : [],
    loading : false,
    error : null,
    productCount : 0,
    resultPerPage : 4
}

export const fetchProducts = createAsyncThunk("fetchProducts", async({keyword="",page=1}) => {
    const response = await axios.get(`/api/v1/products?keyword=${keyword}&page=${page}`);
    console.log("page and keyword : ",page,keyword);
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
            console.log("action : ", action);
            state.loading = false;
            state.productCount = action.payload.productCount;
            state.products = action.payload.products;
            state.resultPerPage = action.payload.resultPerPage;
        })

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export const productReducer = productSlice.reducer;