import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import OrderRowUI from './OrderRowUI';
import Button from 'react-bootstrap/Button';
import OrderAPI from '../../API/OrderAPI';
import { createOrder } from "../../Features/OrderSlice";

import {Order } from '../../Interfaces/Order';
import {OrderLine } from '../../Interfaces/OrderLine';

import { PageSelector } from "../../Components/PageSelector";
import { selectAllOrders } from "../../Features/OrderSlice"

interface Props {
  clickOrder: (orderId : number) => void;
}
  
export default function OrderList({clickOrder}: Props) {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders)

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleAddClick = async () => {

      //Add 300 days to default delivery day
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
      
      const restOrder = await OrderAPI.createOrder(emptyOrder);
      
      if(restOrder)
      {
        dispatch(createOrder({order : restOrder}));    
      }
  };

    return (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Delivery</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(startIndex, endIndex).map(order => {
                return <OrderRowUI key={order.id} order={order} clickOrder={clickOrder}/>
              })}
            </tbody>
          </Table>
          <Button onClick={handleAddClick}>Add</Button> 
          <PageSelector
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={(selectedPage: number) => setCurrentPage(selectedPage)}
          />
       </div>
    )
}

