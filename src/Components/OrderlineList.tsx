import React from 'react'
import Table from 'react-bootstrap/Table';
import { useSelector } from "react-redux";

import OrderlineRowUI from './OrderlineRowUI';

import {OrderLine } from '../Interfaces/OrderLine';
import {Order } from '../Interfaces/Order';
import { selectAllOrders } from "../Features/OrderSlice"

interface Props {
  selectedOrderId : number | null;
}
  
export default function OrderlineList({selectedOrderId}: Props) {

  const allOrders = useSelector(selectAllOrders);

  let order : Order | null = null;
  if (selectedOrderId !== null) {
    const foundOrder = allOrders.find(o => o.id === selectedOrderId);
    order = foundOrder || null;
  }

  return (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Count</th>
                <th>Unit Cost</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
            {order ? order.orderlines.map(orderline => {
              return <OrderlineRowUI key={orderline.id} orderline={orderline} orderId={order!.id} />
            }) : null}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th></th>
                <th></th>
                <th>€</th>
              </tr>
            </tfoot>
          </Table>
       </div>
    )
}

