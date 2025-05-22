import { StateInterface, WishlistInterface } from "@inerfaces/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@services/api";
import { RootState } from "./store";
import checkError from "@utils/checkAxiosError";

// interface IWishlistState extends StateInterface{
//     wishlist: WishlistInterface[]
// }
interface IWishlistState extends StateInterface {
    itemsId: (number | string)[];
    wishlistProducts: WishlistInterface[]
}
const initialState: IWishlistState = {
    itemsId: [],
    error: null,
    loading: 'idle',
    wishlistProducts: [],
}

type TDataType = "productsFullInfo" | "ProductIds";

export const likeDislikeWishlist = createAsyncThunk('wishlist/likeDislikeWishlist', async (productId: string | number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    const { userInfo } = auth;
    try {
        const response = await api.get(`/wishlist?userId=${userInfo?.id}&productId=${productId}`);
        if (response.data.length > 0) {
            await api.delete(`/wishlist/${response.data[0].id}`);
            return { id: productId, message: 'Removed successfully.' }
        } else {
            await api.post('wishlist', { userId: userInfo?.id, productId: productId })
            return { id: productId, message: 'Added successfully.' }
        }
       
    } catch (error) {
        return rejectWithValue(checkError(error));
    }
});

export const getWishlistProducts = createAsyncThunk('wishlist/getWishlistProducts', async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { wishlist, auth } = getState() as RootState;
    const { itemsId } = wishlist;
    const { userInfo } = auth;

    try {
        // const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join('&');
        // // console.log(concatenatedItemsId);
        // if (concatenatedItemsId) {
        //     const response = await api.get(`/products?${concatenatedItemsId}`);

        //     return response.data;
        // } else {
        //     return [];
        // }

        const userWishlist = await api.get<WishlistInterface[]>(`/wishlist?userId=${userInfo?.id}`);
        // console.log(userWishlist.data,userInfo?.id);
        
        if (userWishlist.data.length < 1) {
            return { data: [], dataType: 'empty'}
        }

        if (dataType === 'ProductIds') {
            const itemsIds = userWishlist.data.map((el) => el.productId);
            return { data: itemsIds, dataType: 'ProductIds'}
        }else{
            const concatenatedItemsId = userWishlist.data.map((el) => `id=${el.productId}`).join("&");
            const res = await api.get(`/products?${concatenatedItemsId}`);
            return { data: res.data, dataType: 'productsFullInfo' }
        }

    } catch (error) {
        // if (axios.isAxiosError(error)) {
        //     return rejectWithValue(error.response?.data.message || error.message)
        // } else {
        //     return rejectWithValue('Is unexpected error.')
        // }

        return rejectWithValue(checkError(error));
    }
})

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        cleanUp: (state) => {
            state.wishlistProducts = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(likeDislikeWishlist.pending, (state) => {
            state.loading = 'pending';
        })
            .addCase(likeDislikeWishlist.rejected, (state, action) => {
                state.loading = 'failed';
                if (action.payload && typeof action.payload == 'string') {
                    state.error = action.payload;
                }
            })
            .addCase(likeDislikeWishlist.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                if (!state.itemsId.includes(action.payload.id)) {
                    state.itemsId.push(action.payload.id);
                } else {
                    state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
                    state.wishlistProducts = state.wishlistProducts.filter((el) => el.id !== action.payload.id)
                }
            })

        builder.addCase(getWishlistProducts.pending, (state) => {
            state.loading = 'pending';
        })
            .addCase(getWishlistProducts.rejected, (state, action) => {
                state.loading = 'failed';
                if (action.payload && typeof action.payload == 'string') {
                    state.error = action.payload;
                }
            })
            .addCase(getWishlistProducts.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                // state.wishlistProducts = action.payload;
                if (action.payload.dataType === 'productsFullInfo') {
                    state.wishlistProducts = action.payload.data as WishlistInterface[];
                }else{
                    state.itemsId = action.payload.data as number[];
                }
            })
    }
});

export const { cleanUp } = wishlistSlice.actions;
export default wishlistSlice.reducer;