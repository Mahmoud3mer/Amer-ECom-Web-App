import { ProductInterface, StateInterface } from "@inerfaces/interfaces";
import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import api from "@services/api";
import checkError from "@utils/checkAxiosError";

interface CatrInterface extends StateInterface {
    items: {[key: number | string] : number};
    productsFullInfo: ProductInterface[];
}

const initialState: CatrInterface = {
    items: {},
    productsFullInfo: [],
    loading: 'idle',
    error: null,
}

export const getCartProducts = createAsyncThunk('cart/getCartProducts', async(_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal} = thunkAPI;

    const { cart } = getState() as RootState;
    const itemsIds = Object.keys(cart.items);

    if (itemsIds.length <= 0) {        
        return fulfillWithValue([]);
    }
    
    try {
        const concatenatedItemsId = itemsIds.map(el => `id=${el}`).join('&');
        // console.log(concatenatedItemsId);
        const response = await api.get<ProductInterface[]>(`/products?${concatenatedItemsId}`,{
            signal,
        });
        // console.log(response.data);
        return response.data;
        
    } catch (error) {
        // if (axios.isAxiosError(error)) {
        //     return rejectWithValue(error.response?.data.message || error.message);
        // }else{
        //     return rejectWithValue('An unexpected error.')
        // }

        return rejectWithValue(checkError(error));
    }
})

export const cartSlice = createSlice({
    initialState,
    name: 'cart',
    reducers: {
        addToCart: (state, action) => {
            // console.log(action.payload);
            const productId = action.payload.productId;
            if (state.items[productId]) {
                state.items[productId]++;
            }else{
                state.items[productId] = 1;
            }
        },

        increaseQuantity: (state, action) => {
            const productId = action.payload.productId;
            const newQuantity = action.payload.quantity + 1;
            state.items[productId] = newQuantity;          
        },
        decreaseQuantity: (state, action) => {
            const productId = action.payload.productId;
            const newQuantity = action.payload.quantity - 1;
            state.items[productId] = newQuantity;
        },
        removeItemFromCategory: (state, action) => {
            const productId = action.payload.productId;
            state.productsFullInfo = state.productsFullInfo.filter((el) => el.id !== productId);
            delete state.items[productId];
        },

        cleanUp: (state) => {
            state.productsFullInfo = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCartProducts.pending, (state) => {
            state.loading = 'pending';
        })
        .addCase(getCartProducts.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = 'failed';
        })
        .addCase(getCartProducts.fulfilled, (state, action) => {
            // console.log(action.payload);
            
            state.productsFullInfo = action.payload;
            state.loading = 'succeeded';
        })
    }
});


export const { addToCart, increaseQuantity, decreaseQuantity, removeItemFromCategory, cleanUp } = cartSlice.actions;
export default cartSlice.reducer;
