import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
  </BrowserRouter>
);
