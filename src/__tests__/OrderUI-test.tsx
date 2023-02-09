import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor, act, queryAllByAltText, queryByAltText, getByDisplayValue  } from '@testing-library/react';
import fetch, {FetchMock, enableFetchMocks} from 'jest-fetch-mock';
import userEvent from '@testing-library/user-event'
import ProductAPI from '../API/ProductAPI';
import OrderAPI from '../API/OrderAPI';
import {Product } from '../Model/Product';
import {Order } from '../Model/Order';
import OrderUI  from '../pages/Order/OrderUI';
import { store } from '../app/store';
import '@testing-library/jest-dom';

jest.mock('../API/ProductAPI');
jest.mock('../API/OrderAPI');

describe('OrderAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should render grid with all products', async () => {
    const products = [
      { id: 1, productName: 'Product 1', description: 'Description 1', costPrice: 10, salesPrice: 20 },
      { id: 2, productName: 'Product 2', description: 'Description 2', costPrice: 20, salesPrice: 30 },
    ];
 
    const order1: Order = {
      id: 1,
      orderNumber: 'O111',
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
        orderNumber: 'O222',
        customerName: 'Asiakas 2',
        customerEmail: 'email2@gmail.com',
        customerPhone: '5545454',
        deliveryDate: (new Date()).toDateString(),
        orderlines: [{
          id: 2,
          productId: 1,
          count: 666,
          unitCostPrice: 5,
          totalUnitCostPrice: 3330,
          unitSalesPrice: 10,
          salesPriceTotal: 6660,
          priceUnit: '€'
        },
        {
          id: 4,
          productId: 2,
          count: 555,
          unitCostPrice: 5,
          totalUnitCostPrice: 2775,
          unitSalesPrice: 10,
          salesPriceTotal: 5550,
          priceUnit: '€'
        }]
      };
    
      const order3: Order = {
        id: 3,
        orderNumber: 'O333',
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

     var date = new Date();
     date.setDate(date.getDate() + 300);

     const emptyOrder: Order = {
        id: 0,
        orderNumber: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        deliveryDate: date.toISOString(),
        orderlines: []
      };

    (ProductAPI.getProductData as jest.Mock).mockResolvedValue(products);

    (OrderAPI.getOrderData as jest.Mock).mockResolvedValue([order1, order2]);
    (OrderAPI.createOrder as jest.Mock).mockResolvedValue(order3);
    (OrderAPI.deleteOrder as jest.Mock).mockResolvedValue(true);
  

    const { getByTestId, getAllByTestId, getAllByRole, getByText, getByDisplayValue } = render( <Provider store={store}><OrderUI /></Provider>);
  
    await waitFor(() => {
      expect(getAllByTestId('order-row').length).toBe(2);
      expect(getByText('O111')).toBeInTheDocument();
      expect(getByText('O222')).toBeInTheDocument();
    });
  
    fireEvent.click(getByTestId('orderAddNew'));
    await waitFor(() => {
      expect(OrderAPI.createOrder).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 0,
          orderNumber: '',
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          orderlines: []
         }));

      //Header + 3 rows
      expect(getAllByTestId('order-row').length).toBe(3);
      expect(getByText('O333')).toBeInTheDocument();
    });
  
    fireEvent.click(getByTestId('order-delete-1'));
    await waitFor(() => {
      expect(OrderAPI.deleteOrder).toHaveBeenCalledWith(1);

      expect(getAllByTestId('order-row').length).toBe(2);
      expect(() => getByText('O111')).toThrow();
      expect(getByText('O222')).toBeInTheDocument();
      expect(getByText('O333')).toBeInTheDocument();
    });

    expect(getByText('O222')).toBeInTheDocument();
    expect(getByText('O333')).toBeInTheDocument();

    fireEvent.click(getByText('O222'));
    await waitFor(() => {
      expect(getAllByTestId('orderline-row').length).toBe(2);

      expect(getByText('Product 1')).toBeInTheDocument();
      expect(getByText('Product 2')).toBeInTheDocument();

      expect(getByDisplayValue('666')).toBeInTheDocument();
      expect(getByDisplayValue('555')).toBeInTheDocument();
      expect(() => getByDisplayValue('444')).toThrow();
    });
  });
});
      