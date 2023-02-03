import {OrderLine } from '../Interfaces/OrderLine';
import {Order } from '../Interfaces/Order';

const API_URL = 'https:/localhost:50870/';

class OrderAPI {
    async getOrderData() : Promise<Order[]> {
      try {
        const response  = await fetch(API_URL + 'orders');
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const rawOrders = await response.json();
        return rawOrders;

      } catch (error) {
        console.error(error);
        return [];
      }
    }

    async deleteOrder(orderId: number) : Promise<void> {
      try {
          const response = await fetch(API_URL + 'orders/' + orderId, {
              method: 'DELETE'
          });
          if (!response.ok) {
              throw new Error(response.statusText);
          }
      } catch (error) {
          console.error(error);
      }
  }

  async updateOrder(order: Order) : Promise<Order | null> {
    try {
        const response = await fetch(API_URL + 'orders/' + order.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const restOrder= await response.json();
        return restOrder

    } catch (error) {
        console.error(error);
        return null;
    }
}

async createOrder(order: Order) : Promise<Order | null> {
    try {
        const response = await fetch(API_URL + 'orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const restOrder= await response.json();
        return restOrder

    } catch (error) {
        console.error(error);
        return null;
    }
}
}

export default new OrderAPI();