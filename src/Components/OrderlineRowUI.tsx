import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { updateOrderline, updateOrder } from "../Features/OrderSlice";
import OrderAPI from '../API/OrderAPI';

import {OrderLine } from '../Interfaces/OrderLine';
import {Order } from '../Interfaces/Order';
interface Props {
    orderline: OrderLine;
    order: Order;
}

async function DeleteOrderline(order : Order, orderlineId: number) : Promise<Order | null> 
{
  const orderlineIndex = order.orderlines.findIndex(orderline => orderline.id == orderlineId);
  if (orderlineIndex !== -1){
    const newOrderlines = [
      ...order.orderlines.slice(0, orderlineIndex),
      ...order.orderlines.slice(orderlineIndex + 1)
    ];

    const updatedOrder = {
      ...order,
      orderlines: newOrderlines
    };
  
    return OrderAPI.updateOrder(updatedOrder);
    
  }

  return null;
}

export default function OrderlineRowUI({orderline, order}: Props) {
  const dispatch = useDispatch();

  return (
    <tr key={orderline.id}>
        <td>
            <input type="text" value={orderline.productName} onChange={(e) => {
              const newOrderline = {...orderline};
              newOrderline.productName = e.target.value;
              dispatch(updateOrderline({id : order.id, newOrderline : newOrderline}))}
          } />
        </td>
        <td>
            <input type="number" value={orderline.count} onChange={(e) => {
              const newOrderline = {...orderline};
              newOrderline.count = e.target.valueAsNumber;
              dispatch(updateOrderline({id : order.id, newOrderline : newOrderline}))}
          } />
        </td>
        <td>
            <input type="number" value={orderline.unitCost} onChange={(e) => {
              const newOrderline = {...orderline};
              newOrderline.unitCost = e.target.valueAsNumber;
              dispatch(updateOrderline({id : order.id, newOrderline : newOrderline}))}
          } />{orderline.costUnit}
        </td>
        <td>{orderline.unitCost * orderline.count}{orderline.costUnit}</td>
        <td>
          
          <Button onClick={async () => {
                  const restOrder = await DeleteOrderline(order!, orderline.id)
                  if(restOrder)
                  {
                    dispatch(updateOrder({id : restOrder.id, order : restOrder}));
                  }  
                }
             }>Remove
          </Button>
        </td>
    </tr>
  )
}