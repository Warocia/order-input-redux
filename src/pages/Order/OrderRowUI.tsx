import React from 'react'
import {Order } from '../../Model/Order';
import {OrderLine } from '../../Model/OrderLine';
import OrderAPI from '../../API/OrderAPI';
import Button from 'react-bootstrap/Button';

import { useDispatch } from "react-redux";
import { updateOrder, deleteOrder } from "../../Features/OrderSlice";

interface Props {
    order: Order;
    clickOrder: (orderId : number) => void;
}

export default function OrderRowUI({order, clickOrder}: Props) {
  const dispatch = useDispatch();

  const handleCustomerName = async (e: React.FocusEvent<HTMLInputElement>) => {
    const newOrder = { ...order };
    newOrder.customerName = e.target.value;
    const restOrder = await OrderAPI.updateOrder(newOrder);
    restOrder && dispatch(updateOrder({ id: restOrder.id, order: restOrder }));
  };

  const handleCustomerEmail = async (e: React.FocusEvent<HTMLInputElement>) => {
    const newOrder = { ...order };
    newOrder.customerEmail = e.target.value;
    const restOrder = await OrderAPI.updateOrder(newOrder);
    restOrder && dispatch(updateOrder({ id: restOrder.id, order: restOrder }));
  };

  const handleCustomerPhone = async (e: React.FocusEvent<HTMLInputElement>) => {
    const newOrder = { ...order };
    newOrder.customerPhone = e.target.value;
    const restOrder = await OrderAPI.updateOrder(newOrder);
    restOrder && dispatch(updateOrder({ id: restOrder.id, order: restOrder }));
  };

  const handleDeliveryDate = async (e: React.FocusEvent<HTMLInputElement>) => {
    const newOrder = { ...order };
    if(e.target.valueAsDate)
    {
      newOrder.deliveryDate = e.target.valueAsDate.toISOString();
      const restOrder = await OrderAPI.updateOrder(newOrder);
      restOrder && dispatch(updateOrder({ id: restOrder.id, order: restOrder }));
    }
  };

  const handleRemoveClick = async () => {
      const success = await OrderAPI.deleteOrder(order.id);
      success && dispatch(deleteOrder({ id: order.id }));

  };

  return (
    <tr key={order.id} onClick={() => clickOrder(order.id)}>
        <td>{order.orderNumber}</td>
        <td>
          <input type="text" defaultValue={order.customerName} onBlur={handleCustomerName} />
        </td>
        <td>
          <input type="text" defaultValue={order.customerEmail} onBlur={handleCustomerEmail} />
        </td>
        <td>
          <input type="text" defaultValue={order.customerPhone} onBlur={handleCustomerPhone} />
        </td>
        <td>
          <input  type="date" defaultValue={order.deliveryDate.slice(0,10)} onBlur={handleDeliveryDate} />
        </td>
        <td>
          <Button onClick={handleRemoveClick}>Remove</Button>
        </td>
    </tr>
  )
}