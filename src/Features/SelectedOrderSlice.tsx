import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from '../Interfaces/Order';

const initialState: Order = {
  id: 0,
  orderNumber: "0",
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  deliveryDate: new Date().toISOString().slice(0, 10),
  orderlines: []
};

const selectedOrderSlice = createSlice({
  name: 'selectedOrder',
  initialState,
  reducers: {
    selectedOrderInitialize: (state, action: PayloadAction<Order>) => {
        state = action.payload;
    }
  }
});

export const getSelectedOrder = (state: { selectedOrder: Order }) => state.selectedOrder;

export const { selectedOrderInitialize } = selectedOrderSlice.actions;

export default selectedOrderSlice.reducer;
