import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
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
        return state;
    },
    updateCount(state, action) {
        const { id, count } = action.payload;
        const orderline = state.orderlines.find(orderline => orderline.id === id);
        if (orderline) {
          orderline.count = count;
        }
        
        return state;
    },
    updateUnitCost(state, action) {
      const { id, unitCost } = action.payload;
      const orderline = state.orderlines.find(orderline => orderline.id === id);
      if (orderline) {
        orderline.unitCost = unitCost;
      }
      
      return state;
    },
    updateProductName(state, action) {
      const { id, productName } = action.payload;
      const orderline = state.orderlines.find(orderline => orderline.id === id);
      if (orderline) {
        orderline.productName = productName;
      }
      
      return state;
    }
  }
});

export const getSelectedOrder = (state: { selectedOrder: Order }) => state.selectedOrder;

export const { selectedOrderInitialize, updateCount, updateUnitCost, updateProductName } = selectedOrderSlice.actions;

export default selectedOrderSlice.reducer;
