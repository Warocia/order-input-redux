import React, {useState} from 'react'
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { updateOrder } from "../../features/OrderSlice";
import OrderAPI from '../../api/OrderAPI';
import ProductAPI from '../../api/ProductAPI';
import { SearchableDropdown } from "../../components/SearchableDropdown";

import {OrderLine } from '../../interfaces/OrderLine';
import {Order } from '../../interfaces/Order';

import { selectAllProducts } from "../../features/ProductSlice"

interface Props {
    orderline: OrderLine;
    order: Order;
}


export default function OrderlineRowUI({orderline, order}: Props) {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  const [selectedValue, setSelectedValue] = useState(orderline?.productId);

  const options = allProducts.map(product => ({
    value: product.id,
    label: product.productName
  }));


  const handleRemoveClick = async () => {
    const orderlineIndex = order.orderlines.findIndex(l => l.id == orderline.id);
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
      const tempOrderline = {...newOrderline};

      const modifiedOrderlines = [
        ...order.orderlines.slice(0, orderlineIndex),
        {...tempOrderline},
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

  const handleProductCountChange = async (e: React.FocusEvent<HTMLInputElement>) => {
    const newOrderline = { ...orderline };
    newOrderline.count = e.target.valueAsNumber;

    newOrderline.totalUnitCostPrice = newOrderline.unitCostPrice * newOrderline.count;
    newOrderline.salesPriceTotal = newOrderline.unitSalesPrice * newOrderline.count;
    
    updateOrderline(newOrderline);
  };

  const handleValueChanged = (newValue?: number) => {
    //setSelectedValue(newValue); don't need this because will get value from REST api
    if(newValue)
    {
      const selectedProduct = allProducts.find(p =>p .id === newValue);

      if(selectedProduct)
      {
        const newOrderline = { ...orderline };
        newOrderline.productId = selectedProduct.id;
        
        newOrderline.unitCostPrice = selectedProduct.costPrice;
        newOrderline.unitSalesPrice = selectedProduct.salesPrice;

        newOrderline.totalUnitCostPrice = selectedProduct.costPrice * newOrderline.count;
        newOrderline.salesPriceTotal = selectedProduct.salesPrice * newOrderline.count;

        updateOrderline(newOrderline);
      }  
   
    }
  };
  
  return (
    <tr key={orderline.id}>
        <td>
          <SearchableDropdown options={options} selectedId={selectedValue}  onValueChanged={handleValueChanged} />
        </td>
        <td>
          <input type="number" defaultValue={orderline.count} onBlur={handleProductCountChange} />
        </td>
        <td>
          {orderline.unitCostPrice.toFixed(2)}{orderline.priceUnit}
        </td>
        <td>
          {orderline.totalUnitCostPrice.toFixed(2)}{orderline.priceUnit}
        </td>
        <td>
          {orderline.unitSalesPrice.toFixed(2)}{orderline.priceUnit}
        </td>
        <td>
          {orderline.salesPriceTotal.toFixed(2)}{orderline.priceUnit}
        </td>
        <td>
          {(100 * ((orderline.salesPriceTotal - orderline.totalUnitCostPrice) / orderline.totalUnitCostPrice)).toFixed(2)} %
        </td>
        <td>
          {(100 * ((orderline.salesPriceTotal - orderline.totalUnitCostPrice) / orderline.salesPriceTotal)).toFixed(2)} %
        </td>
        <td>
          <Button onClick={handleRemoveClick}>Remove</Button>
        </td>
    </tr>
  )
}