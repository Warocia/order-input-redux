import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from '../features/OrderSlice';
import productsReducer from '../features/ProductSlice';

export const store = configureStore({
    reducer: {
        orders: ordersReducer,
        products: productsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch