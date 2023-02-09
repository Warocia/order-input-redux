import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, Legend } from 'recharts';
import { selectAllOrders, ordersInitialize } from "../../Features/OrderSlice"
import OrderAPI from '../../API/OrderAPI';
import { ChartItemOrder } from "../../Model/ChartItemOrder"
import { ChartFactory } from "../../Model/Factories/ChartFactory"

function OrdersvisualizationUI() {
    const dispatch = useDispatch();
    const chartItems = ChartFactory.MakeChartItemForOrder(useSelector(selectAllOrders));

    useEffect(() => {
        OrderAPI.getOrderData().then(
          restAPIOrders => {
            dispatch(ordersInitialize(restAPIOrders));
           }
        );
    }, []);

    return (
      <div>
        <p>Order backlog amount per delivery date</p>
        <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartItems}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="deliveryDate" />
            <YAxis  label={{ value: 'EUR', angle: -90, position: 'insideLeft' }}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amountEUR"  name={"EUR"} stroke="#8884d8" />
        </LineChart>
        </ResponsiveContainer>
        <div style={{ height: "50px"}} />
        <ResponsiveContainer width="100%" height={500}>
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
    )
}
  
  export default OrdersvisualizationUI
