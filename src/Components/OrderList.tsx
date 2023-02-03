import React, { useState } from 'react'
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import OrderRowUI from './OrderRowUI';

import {Order } from '../Interfaces/Order';
import {OrderLine } from '../Interfaces/OrderLine';

import { PageSelector } from "./PageSelector";
import { selectAllOrders } from "../Features/OrderSlice"

interface Props {

  }
  
export default function OrderList({}: Props) {
  const orders = useSelector(selectAllOrders)

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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
              </tr>
            </thead>
            <tbody>
              {orders.slice(startIndex, endIndex).map(order => {
                return <OrderRowUI key={order.id} order={order}/>
              })}
            </tbody>
          </Table>
          <PageSelector
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={(selectedPage: number) => setCurrentPage(selectedPage)}
          />
       </div>
    )
}

