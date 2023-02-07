import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { updateOrder } from "../../features/OrderSlice";
import { useSelector } from "react-redux";
import OrderAPI from '../../api/OrderAPI';

import OrderlineRowUI from './OrderlineRowUI';

import {OrderLine } from '../../interfaces/OrderLine';
import {Order } from '../../interfaces/Order';
import { selectAllOrders } from "../../features/OrderSlice"

interface Props {
  selectedOrderId : number | null;
}


export default function OrderlineList({selectedOrderId}: Props) {
  const dispatch = useDispatch();
  const allOrders = useSelector(selectAllOrders);

  let order : Order | null = null;
  if (selectedOrderId !== null) {
    const foundOrder = allOrders.find(o => o.id === selectedOrderId);
    order = foundOrder || null;
  }

  const handleAddClick = async () => {
    if(order){
      const emptyOrderLine: OrderLine = {
        id: 0,
        productId: null,
        count: 0,
        unitCostPrice: 0,
        totalUnitCostPrice: 0,
        unitSalesPrice: 0,
        salesPriceTotal: 0,
        priceUnit: '€'
      };
  
      const newOrderlines = [
          ...order.orderlines,
          emptyOrderLine
      ];
  
      const updatedOrder = {
        ...order,
        orderlines: newOrderlines
      };
  
      const restOrder = await OrderAPI.updateOrder(updatedOrder);
      
      if(restOrder)
      {
        dispatch(updateOrder({id : restOrder.id, order : restOrder}));    
      }
    }  
  };

  return (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Count</th>
                <th>Unit Cost</th>
                <th>Total Unit Cost</th>
                <th>Unit Sales Price</th>
                <th>Total Unit Sales Price</th>
                <th>Profit</th>
                <th>Margin</th>
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
                <th>{order?.orderlines.reduce((sum, current) => sum + current.count, 0).toFixed(2)}</th>
                <th></th>
                <th>{order?.orderlines.reduce((sum, current) => sum + (current.count * current.totalUnitCostPrice), 0).toFixed(2)}€</th>
                <th></th>
                <th>{order?.orderlines.reduce((sum, current) => sum + (current.count * current.salesPriceTotal), 0).toFixed(2)}€</th>
                <th></th>
                <th></th>
                <th>{order ? <Button onClick={handleAddClick}>Add</Button> : null}
                </th>
              </tr>
            </tfoot>
          </Table>
       </div>
    )
}

