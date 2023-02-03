import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from './Features/OrderSlice';
import selectedOrdersReducer from './Features/SelectedOrderSlice';


export const store = configureStore({
    reducer: {
        orders: ordersReducer,
        selectedOrder: selectedOrdersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch