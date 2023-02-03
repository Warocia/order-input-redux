import React, {useState} from 'react'
import {OrderLine } from '../Interfaces/OrderLine';

interface Props {
    orderline: OrderLine;
}
export default function OrderlineRowUI({orderline}: Props) {

  return (
    <tr key={orderline.id}>
        <td>orderline.productName</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
  )
}