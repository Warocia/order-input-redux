import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { updateOrder } from "../../features/OrderSlice";
import OrderAPI from '../../api/OrderAPI';

import {OrderLine } from '../../interfaces/OrderLine';
import {Order } from '../../interfaces/Order';
interface Props {
    orderline: OrderLine;
    order: Order;
}


export default function OrderlineRowUI({orderline, order}: Props) {
  const dispatch = useDispatch();

  const handleRemoveClick = async () => {
    const orderlineIndex = order.orderlines.findIndex(orderline => orderline.id == orderline.id);
    if (orderlineIndex !== -1){
      const modifiedOrderlines = [
        ...order.orderlines.slice(0, orderlineIndex),
        ...order.orderlines.slice(orderlineIndex + 1)
      ];
  
      const updatedOrder = {
        ...order,
        orderlines: modifiedOrderlines
      };
    
      const restOrder = await OrderAPI.updateOrder(updatedOrder);
      restOrder && dispatch(updateOrder({ id: restOrder.id, order: restOrder }));
    }
  };

  const updateOrderline = async (newOrderline: OrderLine) => {
    const orderlineIndex = order.orderlines.findIndex(orderline => orderline.id === newOrderline.id);
  
    if (orderlineIndex !== -1) {
      const modifiedOrderlines = [
        ...order.orderlines.slice(0, orderlineIndex),
        {...newOrderline},
        ...order.orderlines.slice(orderlineIndex + 1),
      ];
  
      const updatedOrder = {
        ...order,
        orderlines: modifiedOrderlines,
      };
  
      const restOrder = await OrderAPI.updateOrder(updatedOrder);
      restOrder && dispatch(updateOrder({ id: restOrder.id, order: restOrder }));
    }
  };

  const handleProductNameChange = async (e: React.FocusEvent<HTMLInputElement>) => {
    const newOrderline = { ...orderline };
    newOrderline.productName = e.target.value;
    updateOrderline(newOrderline);
  };

  const handleProductCountChange = async (e: React.FocusEvent<HTMLInputElement>) => {
    const newOrderline = { ...orderline };
    newOrderline.count = e.target.valueAsNumber;
    updateOrderline(newOrderline);
  };

  const handleProductUnitCostChange = async (e: React.FocusEvent<HTMLInputElement>) => {
    const newOrderline = { ...orderline };
    newOrderline.unitCost = e.target.valueAsNumber;
    updateOrderline(newOrderline);
  };

  return (
    <tr key={orderline.id}>
        <td>
             <input type="text" defaultValue={orderline.productName} onBlur={handleProductNameChange} />
        </td>
        <td>
          <input type="number" defaultValue={orderline.count} onBlur={handleProductCountChange} />
        </td>
        <td>
          <input type="number" defaultValue={orderline.count} onBlur={handleProductUnitCostChange} />
        </td>
        <td>{orderline.unitCost * orderline.count}{orderline.costUnit}</td>
        <td>
          <Button onClick={handleRemoveClick}>Remove</Button>
        </td>
    </tr>
  )
}