import {OrderLine } from '../OrderLine';
import {Order } from '../Order';
import {ChartItemOrder } from '../ChartItemOrder';

export abstract class ChartFactory {         

    public static MakeChartItemForOrder(orders : Order[]): ChartItemOrder[] {
        const items = orders.reduce((acc, order) => {
            const date = new Date(order.deliveryDate.slice(0,10)).toDateString();
            
            if (!acc[date]) {
              acc[date] = { deliveryDate: date, amountEUR: 0 };
            }

            acc[date].amountEUR += order.orderlines.reduce((sum : number, current : OrderLine) => sum + current.salesPriceTotal, 0)
            return acc;
          }, {} as { [key: string]: ChartItemOrder });

        return Object.values(items);
    }
}