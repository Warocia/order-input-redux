import React from 'react'
import {Order } from '../Interfaces/Order';
import {OrderLine } from '../Interfaces/OrderLine';

import { useDispatch } from "react-redux";
import { updateCustomerName, updateCustomerEmail, updateCustomerPhone, updateDeliveryDate } from "../Features/OrderSlice";
import { selectedOrderInitialize } from "../Features/SelectedOrderSlice";

interface Props {
    order: Order;
}

export default function OrderRowUI({order}: Props) {
  const dispatch = useDispatch();

  return (
    <tr key={order.id} onClick={(e) => dispatch(selectedOrderInitialize(order))}>
        <td>{order.orderNumber}</td>
        <td>
            <input type="text" 
                   value={order.customerName} 
                   onChange={(e) => dispatch(updateCustomerName({id : order.id, customerName : e.target.value}))} 
            />
        </td>
        <td>
            <input type="text" 
                   value={order.customerEmail} 
                   onChange={(e) => dispatch(updateCustomerEmail({id : order.id, customerEmail : e.target.value}))} 
            />
        </td>
        <td>
            <input type="text" 
                   value={order.customerPhone} 
                   onChange={(e) => dispatch(updateCustomerPhone({id : order.id, customerPhone : e.target.value}))} 
            />
        </td>
        <td>
          <input  type="date" defaultValue={new Date(order.deliveryDate).toISOString().slice(0,10)} 
            onChange={(e) => dispatch(updateDeliveryDate({id : order.id, deliveryDate : e.target.value}))}>
            </input>
        </td>
    </tr>
  )
}