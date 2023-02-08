import ordersSlice, { selectAllOrders, ordersInitialize, updateOrder, createOrder, deleteOrder } from '../Features/OrderSlice';
import {Order } from '../Interfaces/Order';
import {OrderLine } from '../Interfaces/OrderLine';
import { Reducer, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';
import '@testing-library/jest-dom';


const order1: Order = {
  id: 1,
  orderNumber: 'O1',
  customerName: 'Asiakas 1',
  customerEmail: 'email1@gmail.com',
  customerPhone: '4545454',
  deliveryDate: (new Date()).toDateString(),
  orderlines: [{
    id: 1,
    productId: 1,
    count: 5,
    unitCostPrice: 5,
    totalUnitCostPrice: 25,
    unitSalesPrice: 5,
    salesPriceTotal: 25,
    priceUnit: '€'
  }]
};

const order2: Order = {
    id: 2,
    orderNumber: 'O2',
    customerName: 'Asiakas 2',
    customerEmail: 'email2@gmail.com',
    customerPhone: '5545454',
    deliveryDate: (new Date()).toDateString(),
    orderlines: [{
      id: 2,
      productId: 2,
      count: 1,
      unitCostPrice: 5,
      totalUnitCostPrice: 5,
      unitSalesPrice: 10,
      salesPriceTotal: 10,
      priceUnit: '€'
    }]
  };

  const order3: Order = {
    id: 3,
    orderNumber: 'O3',
    customerName: 'Asiakas 3',
    customerEmail: 'email3@gmail.com',
    customerPhone: '6545454',
    deliveryDate: (new Date()).toDateString(),
    orderlines: [{
      id: 3,
      productId: 3,
      count: 10,
      unitCostPrice: 5,
      totalUnitCostPrice: 50,
      unitSalesPrice: 100,
      salesPriceTotal: 10000,
      priceUnit: '€'
    }]
  };
  

describe('ordersSlice', () => {
    it('should return the initial state', () => {
        const result = ordersSlice(undefined, { type: '@@INIT' });
        expect(result).toEqual([]);
    });

  it('ordersInitialize', () => {
    const result = ordersSlice([], ordersInitialize([order1, order2, order3]));
    expect(result).toEqual([order1, order2, order3]);
  });

  it('updateOrder', () => {
        const updatedOrder = { ...order1};
        updatedOrder.orderNumber = "O666";

        const expectedOrder = { ...order1};
        expectedOrder.orderNumber = "O666";

        const result = ordersSlice([order1, order2, order3], updateOrder({ id: updatedOrder.id, order: updatedOrder }));
        expect(result).toEqual([expectedOrder, order2, order3]);
  });



  it('createOrder', () => {
    const newOrder = { ...order1};
    newOrder.orderNumber = "O4";
    newOrder.id = 4;

    const result = ordersSlice([order1, order2, order3], createOrder({ order: newOrder }));
    expect(result).toEqual([newOrder, order1, order2, order3]);


  });


  it('deleteOrder', () => {
    const result = ordersSlice([order1, order2, order3], deleteOrder({ id: 2 }));
    expect(result).toEqual([order1, order3]);
   })

  it('selectAllOrders', () => {
    const state = { orders: [order1, order2, order3] };
    expect(selectAllOrders(state)).toEqual([order1, order2, order3]);
  });
});