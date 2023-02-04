import React, {useState} from 'react'
import { useDispatch } from "react-redux";
import { updateOrderline } from "../Features/OrderSlice";

import {OrderLine } from '../Interfaces/OrderLine';

interface Props {
    orderline: OrderLine;
    orderId: number
}
export default function OrderlineRowUI({orderline, orderId}: Props) {
  const dispatch = useDispatch();

  return (
    <tr key={orderline.id}>
        <td>
            <input type="text" value={orderline.productName} onChange={(e) => {
              const newOrderline = {...orderline};
              newOrderline.productName = e.target.value;
              dispatch(updateOrderline({id : orderId, newOrderline : newOrderline}))}
          } />
        </td>
        <td>
            <input type="number" value={orderline.count} onChange={(e) => {
              const newOrderline = {...orderline};
              newOrderline.count = e.target.valueAsNumber;
              dispatch(updateOrderline({id : orderId, newOrderline : newOrderline}))}
          } />
        </td>
        <td>
            <input type="number" value={orderline.unitCost} onChange={(e) => {
              const newOrderline = {...orderline};
              newOrderline.unitCost = e.target.valueAsNumber;
              dispatch(updateOrderline({id : orderId, newOrderline : newOrderline}))}
          } />{orderline.costUnit}
        </td>
        <td>{orderline.unitCost * orderline.count}{orderline.costUnit}</td>
    </tr>
  )
}