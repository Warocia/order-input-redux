import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from './Features/OrderSlice';



export const store = configureStore({
    reducer: {
        orders: ordersReducer
    }
})