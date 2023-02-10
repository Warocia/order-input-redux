import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, Legend, TooltipProps } from 'recharts';
import { selectAllOrders, ordersInitialize } from "../../Features/OrderSlice"
import OrderAPI from '../../API/OrderAPI';
import { ChartItemOrder } from "../../Model/ChartItemOrder"
import { ChartFactory } from "../../Model/Factories/ChartFactory"
import SubNavigation from '../../Components/SubNavigation';
import {SubNavigationOption} from '../../Model/SubNavigationOption';
import { lightGreen } from '@mui/material/colors';

const CustomTooltip = ({ active, payload, label } : any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#E9E9E9" }}>
        <p>
          {label}
        </p>
        <p>
          {payload[0].value.toFixed(2)}€
        </p>
      </div>
    );
  }

  return null;
};

function OrdersvisualizationUI() {
    const options : SubNavigationOption[] = [new SubNavigationOption('OrderLineChart', 'Order delivery (line)')
     , new SubNavigationOption('OrderBarChart', 'Order delivery (bar)'), new SubNavigationOption('CumulativeOrderChart', 'Cumulative order') ];

    const [activeOption, setActiveOption] = useState(options[0]);


    const dispatch = useDispatch();
    const chartItems = ChartFactory.MakeChartItemForOrder(useSelector(selectAllOrders));
    const cumulative = ChartFactory.MakeCumulativeSumChart(chartItems);

    useEffect(() => {
        OrderAPI.getOrderData().then(
          restAPIOrders => {
            dispatch(ordersInitialize(restAPIOrders));
           }
        );
    }, []);

    function toggleActiveOption(activeOption : SubNavigationOption) : void {
      setActiveOption(activeOption);
    }
  
    return (
      <div>
        <SubNavigation options={options} toggleActiveOption={toggleActiveOption} />
        {activeOption.option === 'OrderLineChart' && (
        <div>
          <ResponsiveContainer width="100%" height={700}>
            <LineChart data={chartItems}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="deliveryDate" />
              <YAxis label={{ value: 'EUR', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amountEUR" name={"EUR"} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      {activeOption.option === 'OrderBarChart' && (
        <div>
          <ResponsiveContainer width="100%" height={700}>
            <BarChart data={chartItems}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="deliveryDate" />
              <YAxis label={{ value: 'EUR', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="amountEUR" name={"EUR"} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {activeOption.option === 'CumulativeOrderChart' && (
        <div>
          <ResponsiveContainer width="100%" height={700}>
          <LineChart data={cumulative}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="deliveryDate" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone"  dataKey="amountEUR" name={"Cumulative Sum (EUR)"} stroke="#8884d8" />
          </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      </div>
    )
}
  
  export default OrdersvisualizationUI
