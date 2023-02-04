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
  selectedOrderId : number | null;
}



export class OrderUI extends Component<Props, State> {
  constructor(props : Props) {
      super(props);

      this.clickOrder = this.clickOrder.bind(this);
     
      this.state = {
        selectedOrderId : null
      }
    }
  
    componentDidMount() {
      OrderAPI.getOrderData().then(
        restAPIOrders => {
            this.props.ordersInitialize(restAPIOrders)
         }
      );
    }

    clickOrder(orderId : number) : void {
      this.setState(prevState => {
        return {selectedOrderId: orderId};
      });
    }
  
    render() {
      return (
        <div>
             <OrderList clickOrder={this.clickOrder} />
            <h1>Orderlines:</h1>
            <OrderlineList selectedOrderId={this.state.selectedOrderId}/>  
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

