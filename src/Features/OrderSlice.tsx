import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Order } from '../Interfaces/Order';
import {OrderLine } from '../Interfaces/OrderLine';
import OrderAPI from '../API/OrderAPI';

const initialState : Order[]  = []

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        ordersInitialize: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        },
        updateCustomerName(state, action) {
            const { id, customerName } = action.payload;
            const index = state.findIndex(order => order.id === id);
            if (index !== -1) {
                const tempOrder = { ...state[index] };
                tempOrder.customerName = customerName;
                return [
                    ...state.slice(0, index),
                    tempOrder,
                    ...state.slice(index + 1),
                ];
            }
            return state;
        },
        updateCustomerEmail(state, action) {
            const { id, customerEmail } = action.payload;
            const index = state.findIndex(order => order.id === id);
            if (index !== -1) {
                const tempOrder = { ...state[index] };
                tempOrder.customerEmail = customerEmail;
                return [
                    ...state.slice(0, index),
                    tempOrder,
                    ...state.slice(index + 1),
                ];
            }
            return state;
        },
        updateCustomerPhone(state, action) {
            const { id, customerPhone } = action.payload;
            const index = state.findIndex(order => order.id === id);
            if (index !== -1) {
                const tempOrder = { ...state[index] };
                tempOrder.customerPhone = customerPhone;
                return [
                    ...state.slice(0, index),
                    tempOrder,
                    ...state.slice(index + 1),
                ];
            }
            return state;
        }
        ,
        updateDeliveryDate(state, action) {
            const { id, deliveryDate } = action.payload;
            const index = state.findIndex(order => order.id === id);
            if (index !== -1) {
                const tempOrder = { ...state[index] };
                tempOrder.deliveryDate = deliveryDate;
                return [
                    ...state.slice(0, index),
                    tempOrder,
                    ...state.slice(index + 1),
                ];
            }
            return state;
        },
        updateOrderline(state, action) {
            const { id, newOrderline } = action.payload;

            const index = state.findIndex(order => order.id === id);
            if (index !== -1) {
                const tempOrder : Order = { ...state[index] };

                const orderlineIndex = tempOrder.orderlines.findIndex(orderline => orderline.id === newOrderline.id);

                if (orderlineIndex !== -1){
                    tempOrder.orderlines = [
                            ...tempOrder.orderlines.slice(0, orderlineIndex),
                            newOrderline,
                            ...tempOrder.orderlines.slice(orderlineIndex + 1),
                        ];

                        return [
                            ...state.slice(0, index),
                            tempOrder,
                            ...state.slice(index + 1),
                        ];
                }
            }
            return state;
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
        }
    }
})

export const selectAllOrders = (state: { orders: Order[] }) => state.orders;

export const { ordersInitialize, updateCustomerName, updateCustomerEmail, updateCustomerPhone, updateDeliveryDate,
     updateOrderline, updateOrder } = ordersSlice.actions

export default ordersSlice.reducer