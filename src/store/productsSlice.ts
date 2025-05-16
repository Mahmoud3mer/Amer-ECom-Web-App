import { ProductInterface, StateInterface } from "@inerfaces/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@services/api";
import checkError from "@utils/checkAxiosError";

interface StateProductInterface extends StateInterface {
    productsCategory: Array<ProductInterface>,
    products: Array<ProductInterface>,
}
const initialState: StateProductInterface = {
    loading: 'idle',
    productsCategory: [],
    products: [],
    error: null,
}

export const getProductsCategory = createAsyncThunk('products/getProductsCategory', async (cat_prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
        const response = await api.get(`/products?cat_prefix=${cat_prefix}`,{
            signal,
        });
        // console.log(response.data);
        return response.data;

    } catch (error) {
        // if (axios.isAxiosError(error)) {
        //     return rejectWithValue(error.response?.data.message || error.message);
        // } else {
        //     return rejectWithValue("An unexpected error.");
        // }
        
        return rejectWithValue(checkError(error));
    }
});

export const getAllProducts = createAsyncThunk('products/getAllProducts', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await api.get(`/products`);
        // console.log(response.data);
        return response.data;

    } catch (error) {
        // if (axios.isAxiosError(error)) {
        //     return rejectWithValue(error.response?.data.message || error.message);
        // } else {
        //     return rejectWithValue("An unexpected error.");
        // }

        return rejectWithValue(checkError(error));
    }
})

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsCleanUp: (state) => {
            state.products = [];
            state.productsCategory = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductsCategory.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        })
            .addCase(getProductsCategory.rejected, (state, action) => {
                state.loading = 'failed';
                if (action.payload && typeof action.payload === 'string') {
                    state.error = action.payload;
                }

                // or type casting
                // state.error = action.payload as string;
            })
            .addCase(getProductsCategory.fulfilled, (state, action) => {
                state.productsCategory = action.payload;
                state.loading = 'succeeded';
            })
        
            // All products
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = 'failed';
                if (action.payload && typeof action.payload === 'string') {
                    state.error = action.payload;
                }

                // or type casting
                // state.error = action.payload as string;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = 'succeeded';
            })
    }
});

export const { productsCleanUp } = productsSlice.actions;

export default productsSlice.reducer;