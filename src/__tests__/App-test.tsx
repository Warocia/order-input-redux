import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../app/store';
import '@testing-library/jest-dom';

describe('App component', () => {
    it('renders the Sidenav component', () => {
      render(
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      );
      expect(screen.getByTestId('sidenav')).toBeInTheDocument();
    });
  
    it('renders the OrderUI component by default', () => {
      render(
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      );
      expect(screen.getByTestId('order-ui')).toBeInTheDocument();
    });
  
    it('renders the ProductUI component when the product page is visited', () => {
      render(
        <Provider store={store}>
          <Router initialEntries={['/productpage']}>
            <App />
          </Router>
        </Provider>
      );
      expect(screen.getByTestId('product-ui')).toBeInTheDocument();
    });
  });