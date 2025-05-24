import { OrderInterface, StateInterface } from "@inerfaces/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import checkError from "@utils/checkAxiosError";
// import { RootState } from "./store";
import api from "@services/api";
import { RootState } from '@store/store';

interface TOrdersState extends StateInterface {
    orders: Array<OrderInterface>
}

const initialState: TOrdersState = {
    loading: 'idle',
    error: null,
    orders: [],
}


export const placeOrder = createAsyncThunk('orders/placeOrder', async (subtotal: number, thunk) => {
    const { rejectWithValue, getState } = thunk;
    const { cart, auth } = getState() as RootState;

    const orderItems = cart.productsFullInfo.map((el) => {
        return {
            id: el.id,
            title: el.title,
            quantity: cart.items[el.id],
            price: el.price,
            img: el.img,
        }
    });

    try {
        const res = await api.post('/orders', {
            userId: auth.userInfo?.id,
            items: orderItems,
            subtotal: subtotal
        });

        return res.data;
    } catch (error) {
        return rejectWithValue(checkError(error));
    }
});

export const getOrders = createAsyncThunk('orders/getOrders', async (_, thunk) =>{
    const { rejectWithValue, getState, signal } = thunk;
    const { auth } = getState() as RootState;
    const { userInfo } = auth;
    try {
        const res = await api.get(`/orders?userId=${userInfo?.id}`,{
            signal,
        });
        // console.log(res.data);
        
        return res.data;
    } catch (error) {
        return rejectWithValue(checkError(error));
    }
});

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        resetLoadingStatus: (s) => {
            s.loading = 'idle';
        },
        cleanUpOrders: (s) => {
            s.orders = [];
            s.loading = 'idle';
            s.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(placeOrder.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        })
        .addCase(placeOrder.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.payload as string;
        })
        .addCase(placeOrder.fulfilled, (s, a) => {
            s.loading = 'succeeded';
            s.error = null;
            // s.orders = a.payload;
        })
        .addCase(getOrders.pending, (s) => {
            s.error = null;
            s.loading = 'pending';
        })
        .addCase(getOrders.rejected, (s, a) => {
            s.loading = 'failed';
            s.error = a.payload as string;
        })
        .addCase(getOrders.fulfilled, (s, a) => {
            s.loading = 'succeeded';
            s.orders = a.payload;
        })
    }
});

export const {
    resetLoadingStatus,
    cleanUpOrders,
} = ordersSlice.actions;

export default ordersSlice.reducer;