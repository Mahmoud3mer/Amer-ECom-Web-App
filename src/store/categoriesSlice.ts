import { CategoryInterface, StateInterface } from "@inerfaces/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@services/api";
import checkError from "@utils/checkAxiosError";

interface CategoryStateInterface extends StateInterface{
    categories: Array<CategoryInterface>,
}

const initialState: CategoryStateInterface = {
    loading: 'idle',
    categories: [],
    error: null,
}

export const getCategories = createAsyncThunk('category/getCategories', async(_, thunkAPI) => {

    const { rejectWithValue, signal } = thunkAPI;
    try {
        const response = await api<CategoryInterface[]>('/categories', {
            signal,
        });
        return response.data;
    } catch (error) {
        // if (axios.isAxiosError(error)) {
        //     return rejectWithValue(error.response?.data.message || error.message);
        // }else{
        //     return rejectWithValue("An unexpected error.")
        // }

        return rejectWithValue(checkError(error));
    }
    
    
});

export const categoriesSlice = createSlice({
    initialState,
    name: 'category',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        })
        .addCase(getCategories.rejected, (state, action) => {
            state.loading = 'failed';
            if (action.payload && typeof action.payload === 'string') {
                state.error = action.payload;
            }
            // or type casting
            // state.error = action.payload as string;
        })
        .addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.loading = 'succeeded';
        })
    }
});


export default categoriesSlice.reducer;
