import React, {useState, Component} from 'react';
import OrderAPI from '../API/OrderAPI';
import OrderList from './OrderList';
import OrderlineList from './OrderlineList';
import { connect } from 'react-redux';
import { ordersInitialize } from "../Features/OrderSlice";

import {Order } from '../Interfaces/Order';



interface Props {  
  ordersInitialize: (data: Order[]) => void;
}


interface State {
}



export class OrderUI extends Component<Props, State> {
  constructor(props : Props) {
      super(props);

      this.state = {
      }
    }
  
    componentDidMount() {
      OrderAPI.getOrderData().then(
        restAPIOrders => {
            this.props.ordersInitialize(restAPIOrders)
          }
        );
      }
  
    render() {
      return (
        <div>
            <OrderList/>
            <h1>Orderlines:</h1>
            <OrderlineList/>  
        </div>
      );
    }
  }

const mapDispatchToProps = (dispatch: any) => {
  return {
    ordersInitialize: (data: Order[]) => dispatch(ordersInitialize(data))
  };
};

export default connect(null, mapDispatchToProps)(OrderUI);

