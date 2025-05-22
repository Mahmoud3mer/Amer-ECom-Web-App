import { StateInterface } from "@inerfaces/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@services/api";
import checkError from "@utils/checkAxiosError";

interface AuthInterface extends StateInterface{
    accessToken: string,
    userInfo: {
        email: string,
        lastName: string,
        firstName: string,
        id: string | number
    } | null,
}
const initialState: AuthInterface = {
    loading: 'idle',
    error: null,
    accessToken: '',
    userInfo: {
        email: '',
        lastName: '',
        firstName: '',
        id: ''
    }, 
}

type TFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

type TLoginFormData = {
    email: string,
    password: string,
}

export const authRegister = createAsyncThunk('auth/authRegister', async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
        const response = await api.post('/register', formData);
        console.log(response.data);
        
        return response.data;

    } catch (error) {
        return rejectWithValue(checkError(error));
    }
});

export const authLogIn = createAsyncThunk('auth/authLogIn', async (formData: TLoginFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await api.post('/login', formData);
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        console.log(error);
        
        return rejectWithValue(checkError(error));
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetUI: (state) => {
            state.error = null;
            state.loading = 'idle';
        },
        logOut: (state) => {
            state.accessToken = '';
            state.userInfo = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authRegister.pending, (state) => {
            state.loading = 'pending';
        })
        .addCase(authRegister.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.payload as string;
        })
        .addCase(authRegister.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.userInfo = action.payload.user;
        })
        builder.addCase(authLogIn.pending, (state) => {
            state.loading = 'pending';
        })
        .addCase(authLogIn.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.payload as string;
        })
        .addCase(authLogIn.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.userInfo = action.payload.user;
            state.accessToken = action.payload.accessToken;
        })
    }
})

export const { resetUI, logOut } = authSlice.actions;
export default authSlice.reducer;