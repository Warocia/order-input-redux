import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Order } from '../Interfaces/Order';
import {OrderLine } from '../Interfaces/OrderLine';


const initialState : Order[]  = []

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        ordersInitialize: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        },
        updateOrder(state, action) {
            const { id, order } = action.payload;

            const index = state.findIndex(order => order.id === id);
            if (index !== -1) {
               
                return [
                    ...state.slice(0, index),
                    {...order},
                    ...state.slice(index + 1),
                ];
            }
            
            return state;
        },
        createOrder(state, action) {
            const {order} = action.payload;

            return [
                {...order},
                ...state,
            ];

        },
        deleteOrder(state, action) {
            const {id} = action.payload;

            const index = state.findIndex(order => order.id === id);
            if (index !== -1) {
               
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1),
                ];
            }
        }
    }
})

export const selectAllOrders = (state: { orders: Order[] }) => state.orders;

export const { ordersInitialize, updateOrder, createOrder, deleteOrder } = ordersSlice.actions

export default ordersSlice.reducer