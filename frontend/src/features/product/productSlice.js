import  {createSlice} from "@reduxjs/toolkit";

const initialState = ({
    products : [{name : "t-shirt", price : "3000"}]
})

const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        addProduct : (state,action) => {
            const newProduct = {name : action.payload, price : action.payload}
            state.push(newProduct);
        }
    }
})

export const {addProduct} = productSlice.actions;
export const productReducer = productSlice.reducer;