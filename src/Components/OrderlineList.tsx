import React from 'react'
import Table from 'react-bootstrap/Table';
import { useSelector } from "react-redux";

import OrderlineRowUI from './OrderlineRowUI';

import {OrderLine } from '../Interfaces/OrderLine';
import { getSelectedOrder } from "../Features/SelectedOrderSlice"

interface Props {

  }
  
export default function OrderlineList({}: Props) {
   const order = useSelector(getSelectedOrder)

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
              {order?.orderlines.map(orderline => {
                return <OrderlineRowUI key={orderline.id} orderline={orderline}/>
              })}
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

