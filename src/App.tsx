import React from 'react';
import OrderUI from './pages/Order/OrderUI';
import ProductUI from './pages/Product/ProductUI';
import {Order } from './interfaces/Order';
import {
  Routes,
  Route,
} from "react-router-dom";
import Sidenav from "./components/Sidenav";
import './App.css';



function App() {
  return (
    <div className="MainContainer">
       <Sidenav/>
      <div className='MainContainerValue'>
      <Routes>
        <Route path="/" element={<OrderUI/>} />
        <Route path="/productpage" element={<ProductUI/>} />
      </Routes>
      </div>
    </div>
  )
}

export default App;
