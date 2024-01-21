import { configureStore } from '@reduxjs/toolkit'
import { ApiSlice } from './slices/apiSlice'
import cartSlice from './slices/cartSlice';
import authSlice from './slices/usersSlice'
export const store = configureStore({
    reducer: {
        [ApiSlice.reducerPath] : ApiSlice.reducer,   
        cart: cartSlice,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(ApiSlice.middleware),
    devTools: true
  });