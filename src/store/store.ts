import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categoriesSlice";
import productsSlice from './productsSlice';
import cartSlice from "./cartSlice";
import storage from 'redux-persist/lib/storage';
import authSlice from "./authSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import wishlistSlice from "./wishlistSlice";


const rootersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'wishlist', 'auth'],
}

const cartPersistConfig = {
    key: 'cart',
    storage,
    whitelist: ['items'],
}
const wishlistPersistConfig = {
    key: 'wishlist',
    storage,
    whitelist: ['itemsId'],
}
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['accessToken', 'userInfo'],
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authSlice),
    categories: categoriesSlice,
    products: productsSlice,
    cart: persistReducer(cartPersistConfig, cartSlice),
    wishlist: persistReducer(wishlistPersistConfig, wishlistSlice),
})


const persistedReducer = persistReducer(rootersistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

/* ts بتديني الكود ده عشان اتأكد اني باخد الستيت الصح وبعم ديس باتش لأكشن صح */
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const persistor = persistStore(store);

export { store, persistor };