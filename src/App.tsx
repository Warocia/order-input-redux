import React from 'react';
import OrderUI from './pages/Order/OrderUI';
import ProductUI from './pages/Product/ProductUI';
import OrdersvisualizationUI from './pages/Ordersvisualization/OrdersvisualizationUI';

import {Order } from './Model/Order';
import {
  Routes,
  Route,
} from "react-router-dom";
import Sidenav from "./Components/Sidenav";
import './App.css';



function App() {
  return (
    <div className="MainContainer">
       <Sidenav/>
      <div className='MainContainerValue'>
      <Routes>
        <Route path="/" element={<OrderUI/>} />
        <Route path="/productpage" element={<ProductUI/>} />
        <Route path="/ordersvisualization" element={<OrdersvisualizationUI/>} />
      </Routes>
      </div>
    </div>
  )
}

export default App;
