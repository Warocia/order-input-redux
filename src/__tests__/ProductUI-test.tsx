import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor, act, queryAllByAltText, queryByAltText  } from '@testing-library/react';
import fetch, {FetchMock, enableFetchMocks} from 'jest-fetch-mock';
import userEvent from '@testing-library/user-event'
import ProductAPI from '../API/ProductAPI';
import {Product } from '../Interfaces/Product';
import ProductUI  from '../pages/Product/ProductUI';
import { store } from '../app/store';
import '@testing-library/jest-dom';

jest.mock('../API/ProductAPI');

describe('ProductUI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should render grid with all products', async () => {
    const products = [
      { id: 1, productName: 'Product 1', description: 'Description 1', costPrice: 10, salesPrice: 20 },
      { id: 2, productName: 'Product 2', description: 'Description 2', costPrice: 20, salesPrice: 30 },
    ];
  

    (ProductAPI.getProductData as jest.Mock).mockResolvedValue(products);
    (ProductAPI.createProduct as jest.Mock).mockResolvedValue({ id: 3, productName: 'Product 3', description: 'Description 3', costPrice: 30, salesPrice: 40 });
    (ProductAPI.updateProduct as jest.Mock).mockResolvedValue({ id: 1, productName: 'Updated Product 1', description: 'Updated Description 1', costPrice: 15, salesPrice: 25 });
    (ProductAPI.deleteProduct as jest.Mock).mockResolvedValue(true);
  
    jest.useFakeTimers();
    window.HTMLElement.prototype.scrollIntoView = function() {};
    const { getByTestId, getAllByTestId, getAllByRole, getByText, } = render( <Provider store={store}><ProductUI /></Provider>);
  
    await waitFor(() => {
      //Header + 2 rows
      expect(getAllByRole('row').length).toBe(3);
      expect(getByText('Product 1')).toBeInTheDocument();
      expect(getByText('Product 2')).toBeInTheDocument();
    });
  
    fireEvent.click(getByTestId('product-ui-addNewProduct'));
    await waitFor(() => {
      expect(ProductAPI.createProduct).toHaveBeenCalledWith({ id: 0, productName: '', description: '', costPrice: 0, salesPrice: 0 });
      //Header + 3 rows
      expect(getAllByRole('row').length).toBe(4);
      expect(getByText('Product 3')).toBeInTheDocument();
    });
  
    act(() => {
      jest.advanceTimersByTime(1000 * 10);
    })

    fireEvent.click(getByTestId('delete-1'));

    await waitFor(() => {
      expect(ProductAPI.deleteProduct).toHaveBeenCalledWith(1);
      //Header + 2 rows
      expect(getAllByRole('row').length).toBe(3);
      expect(() => getByText('Product 1')).toThrow();
      expect(getByText('Product 2')).toBeInTheDocument();
      expect(getByText('Product 3')).toBeInTheDocument();
    });
  });
});
      