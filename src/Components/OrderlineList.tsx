import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { updateOrderline, updateOrder } from "../Features/OrderSlice";
import { useSelector } from "react-redux";
import OrderAPI from '../API/OrderAPI';

import OrderlineRowUI from './OrderlineRowUI';

import {OrderLine } from '../Interfaces/OrderLine';
import {Order } from '../Interfaces/Order';
import { selectAllOrders } from "../Features/OrderSlice"

interface Props {
  selectedOrderId : number | null;
}

async function AddNewOrderline(order : Order) : Promise<Order | null> 
{
  const emptyOrderLine: OrderLine = {
      id: 0,
      productName: '',
      count: 0,
      unitCost: 0,
      totalCost: 0,
      costUnit: ''
  };

  const newOrderlines = [
      ...order.orderlines,
      emptyOrderLine
  ];

  const updatedOrder = {
    ...order,
    orderlines: newOrderlines
  };

  return OrderAPI.updateOrder(updatedOrder);
}

export default function OrderlineList({selectedOrderId}: Props) {
  const dispatch = useDispatch();
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
                <th></th>
              </tr>
            </thead>
            <tbody>
            {order ? order.orderlines.map(orderline => {
              return <OrderlineRowUI key={orderline.id} orderline={orderline} order={order!} />
            }) : null}
            </tbody>
            <tfoot>
              <tr>
              <th>Total</th>
                <th>{order?.orderlines.reduce((sum, current) => sum + current.count, 0)}</th>
                <th></th>
                <th>{order?.orderlines.reduce((sum, current) => sum + (current.count * current.unitCost), 0)}€</th>
                <th>{order ? <Button onClick={async () => {
                  const restOrder = await AddNewOrderline(order!)
                  if(restOrder)
                  {
                    dispatch(updateOrder({id : restOrder.id, order : restOrder}));
                  }  
                }
               
                }>Add</Button> : null}</th>
              </tr>
            </tfoot>
          </Table>
       </div>
    )
}

